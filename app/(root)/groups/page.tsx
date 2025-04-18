"use client";

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createGroupSchema } from '@/lib/validations';
import { findAmigosById } from '@/lib/actions/relationsUsers';
import { useSession } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ImageUpload from '@/components/ImageUpload';
import { createGroup, findGroupsByUserId } from '@/lib/actions/groups';
import { addUsersToGroup } from '@/lib/actions/relationsGroups';
import { createRoom } from '@/lib/actions/rooms';
import { addUsersToRoom } from '@/lib/actions/relationsRooms';

const page = () => {
  const {data: session} = useSession();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [amigos, setAmigos] = useState<User[] | null>(null);
  const [participantes, setParticipantes] = useState<string[] | null>(null);
  const [myGroups, setMyGroups] = useState<Group[] | null>(null);

  const GroupForm = useForm<z.infer<typeof createGroupSchema>>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      thumbnail: "",
    }
  })

  const fetchAmigos = async () => {
    const result = await findAmigosById(session?.user?.id!);
    setAmigos(result);
  }

  const fetchGroupsByUserId = async () => {
    const result = await findGroupsByUserId(session?.user?.id!);
    setMyGroups(result);
  }

  useEffect(() => {
    fetchAmigos();
    fetchGroupsByUserId();
    setParticipantes(session?.user?.id! ? [session?.user?.id!] : []);
  }, [session?.user?.id]);

  const onSubmitCreateGroup = async (values: z.infer<typeof createGroupSchema>) => {
    setIsCreating(true);
    const group = await createGroup({
      name: values.name,
      description: values.description,
      thumbnail: values.thumbnail,
      creatorId: session?.user?.id!,
    });

    await addUsersToGroup(
      group.id as string,
      participantes!.map((userId, index) => ({
        userId,
        role: index === 0 ? "ADMIN" : "USER",
      }))
    );

    const room = await createRoom(
      group.id as string,
      "Geral",
      "Sala de chat geral",
    );

    await addUsersToRoom(
      room.id as string,
      participantes!.map((userId, index) => ({
        userId,
        role: index === 0 ? "ADMIN" : "USER",
      }))
    );

    setIsCreating(false);
    clearSpaces();
  }

  const addToParticipantes = (amigo: User) => () => {
    setParticipantes((prev) => {
      if (!prev) return [];

      if (prev.includes(amigo.id)) {
        return prev.filter((id) => id !== amigo.id);
      } else {
        return [...prev, amigo.id];
      }
    });
  }

  const clearSpaces = () => {
    GroupForm.reset();
    setParticipantes(session?.user?.id! ? [session?.user?.id!] : []);
  }

  return (
    <section className="w-full rounded-2xl p-11 flex-1 justify-between lg:flex-col font-roboto">
      <div className="w-full h-full">
        <Dialog>
          <DialogTrigger className="text-my-blue" asChild>
            <Button
              type='button'
              variant="outline"
              className="contain-content border-my-blue rounded-2xl cursor-pointer"
            >
              Criar grupo
              <img width={36} height={36} src="add.svg" alt="Add group"/>
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isCreating ? "animate-pulse" : ""}`}>
            <DialogHeader>
              <DialogTitle className="text-my-blue text-2xl">Crie um grupo e converse à vontade!</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="flex-1 gap-2">
                <Form {...GroupForm}>
                  <form className='space-y-2'>
                    <FormField
                      control={GroupForm.control}
                      name={"name"}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className='font-roboto text-xl text-my-blue'>Título</FormLabel>
                          <FormControl>
                            <Input
                              required
                              placeholder="Nome do grupo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={GroupForm.control}
                      name={"description"}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className='font-roboto text-xl text-my-blue'>Descrição</FormLabel>
                          <FormControl>
                            <Input
                              required
                              placeholder="Descreva o grupo, o que ele faz, como ele funciona e etc"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={GroupForm.control}
                      name={"thumbnail"}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormLabel className='font-roboto text-xl text-my-blue'>Imagem do Grupo</FormLabel>
                          <FormControl>
                            <ImageUpload onFileChange={field.onChange}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='flex items-center justify-between'>
                      <h2 className="text-xl font-semibold text-my-blue font-roboto pb-4 mt-4 lg:pb-8 lg:mt-4">Amigos</h2>
                      <img onClick={fetchAmigos} src="refresh.svg" alt="Atualizar lista de amigos" width={36} height={36} className='cursor-pointer'/>
                    </div>
                    <div className="pt-2 lg:pt-0">
                      {amigos && (
                        <>
                          {amigos.map((amigo) => (
                            <Button type='button' onClick={addToParticipantes(amigo)} key={amigo.id} className="">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <img src={amigo?.image} alt="" className={`h-20 w-20 rounded-full bg-google-black ${participantes?.includes(amigo.id) ? "border-my-blue ring-4 ring-my-blue scale-105" : ""} transition-all duration-300 ease-in-out hover:scale-110`} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {amigo?.name}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </Button>
                          ))}
                        </>
                      )}
                    </div>

                    <div className='w-full flex items-center pt-8'>
                      <Button onClick={GroupForm.handleSubmit(onSubmitCreateGroup)} type='submit' size="sm" className='flex-1/4 mt-1 border border-my-blue text-my-blue h-10 cursor-pointer'>
                        Criar
                        <img src="create_group.svg" alt="Procurar" width={30} height={30}/>
                      </Button>
                      <Button onClick={clearSpaces} type='button' size="sm" className='flex-1 mt-1 border border-google-grey text-google-grey ml-2 h-10 cursor-pointer'>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <h2 className="text-xl font-semibold text-google-grey font-roboto pb-4 mt-4 lg:pb-8 lg:mt-4">Grupos</h2>
      <div className="w-auto flex flex-wrap justify-start">
        {myGroups && (
          <>
            {myGroups.map((group, idx) => (
              <div key={idx} className="flex space-x-2 justify-start space-y-4 pr-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <img src={group?.thumbnail} alt="" className="h-20 w-20 rounded-full bg-google-black"/>
                    </TooltipTrigger>
                    <TooltipContent>
                      {group?.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default page