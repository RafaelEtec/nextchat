"use client";

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { inviteByEmailSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { inviteByEmail } from '@/lib/actions/relationsUsers';
import { findUserByEmail } from '@/lib/actions/users';
import { useSession } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [isSent, setIsSent] = useState<boolean>(false)
  const [notFound, setNotFound] = useState<boolean>(false)
  const {data: session} = useSession();
  const [foundUser, setFoundUser] = useState<User | null>(null);

  const router = useRouter();
  const solicitacoes = null;

  const EmailForm = useForm<z.infer<typeof inviteByEmailSchema>>({
    resolver: zodResolver(inviteByEmailSchema),
    defaultValues: {
      email: "",
      userId: session?.user?.id!,
      friendId: "",
    }
  })

  const onSubmitFindUserByEmail = async (values: z.infer<typeof inviteByEmailSchema>) => {
    setFoundUser(null);
    setIsSent(false);
    setNotFound(false);
    if (values.email === session?.user?.email) return

    setIsLoading(true);
    const found = await findUserByEmail(values);
    if (!found.success) { setNotFound(true); }
    setIsLoading(false);
    setFoundUser(found.data);
  }

  const onSubmitInviteByEmail = async (values: z.infer<typeof inviteByEmailSchema>) => {
    if (!foundUser) return;
    setIsSending(true);
    setNotFound(false);
    setIsSent(false);
    EmailForm.setValue("friendId", foundUser.id);
    const result = await inviteByEmail({
      email: values.email,
      userId: session?.user?.id!,
      friendId: foundUser.id,
    });
    setIsSent(true);
    setIsSending(false);
    clearSpaces();
  }

  const clearSpaces = () => {
    setFoundUser(null);
    setNotFound(false);
    EmailForm.setValue("email", "");
    EmailForm.setValue("friendId", "");
  }

  return (
    <section className="w-full rounded-2xl p-11 flex-1 justify-between lg:flex-col font-roboto">
      <div className="w-full h-full">
        <Dialog>
          <DialogTrigger className="text-my-blue" asChild>
            <Button
              variant="outline"
              className="contain-content border-my-blue rounded-2xl"
            >
              Convidar Amigos
              <img width={36} height={36} src="add.svg" alt="Add user"/>
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isSending ? "animate-pulse" : ""}`}>
            <DialogHeader>
              <DialogTitle className="text-my-blue">Convide alguém pelo E-mail</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="flex-1 gap-2 inline-flex">
                <Form {...EmailForm}>
                  <form onSubmit={EmailForm.handleSubmit(onSubmitFindUserByEmail)} className='w-full'>
                    <FormField
                      control={EmailForm.control}
                      name={"email"}
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                          <FormControl>
                            <Input
                              required
                              placeholder="fulano@nextchat.com"
                              {...field}
                              onClick={clearSpaces}
                              className="book-form_input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                  <Button onClick={EmailForm.handleSubmit(onSubmitFindUserByEmail)} type='submit' size="sm" className='mt-1'>
                    <img src="magnifier.svg" alt="Procurar" width={30} height={30}/>
                  </Button>
                </Form>
              </div>
            </div>
            <div className='font-roboto'>
                {isSent && (
                  <Alert className='border-google-lg-green'>
                  <AlertTitle className='flex flex-1 gap-2 text-google-lg-green font-roboto'><img width={20} height={20} src="check_green.svg" alt="Boa" />Boa!</AlertTitle>
                  <AlertDescription className='text-google-lg-green font-roboto'>
                    O Convite Foi Enviado!
                  </AlertDescription>
                </Alert>
                )}
                {notFound && (
                  <Alert className='border-google-lg-yellow'>
                    <AlertTitle className='flex flex-1 gap-2 text-google-lg-yellow'><img width={20} height={20} src="question_yellow.svg" alt="Opa" />Opa</AlertTitle>
                    <AlertDescription className='text-google-lg-yellow'>
                      Usuário Não Encontrado!
                    </AlertDescription>
                  </Alert>
                )}
                {isLoading && (
                  <div className='flex items-center justify-center'>
                    <img src="loading.svg" alt="loading" width={100} height={100} className='animate-spin'/>
                  </div>
                )}
                {foundUser && (
                  <>
                    <div key="foundUser" className="flex space-x-2 justify-start space-y-2 pr-4">
                      <img src={foundUser?.image} alt="Friend Avatar" className="h-20 w-20 rounded-full bg-google-black"/>
                      <div className="">
                        <p className="">{foundUser.name}</p>
                        <p className="">{foundUser.email}</p>
                      </div>
                    </div>
                    <div className='w-full flex items-center'>
                      <Button onClick={EmailForm.handleSubmit(onSubmitInviteByEmail)} type='submit' size="sm" className='flex-1/4 mt-1 border border-my-blue text-my-blue h-10'>
                        Convidar
                        <img src="adduser.svg" alt="Procurar" width={30} height={30}/>
                      </Button>
                      <Button onClick={clearSpaces} type='submit' size="sm" className='flex-1 mt-1 border border-google-grey text-google-grey ml-2 h-10'>
                        Cancelar
                      </Button>
                    </div>
                  </>
                )}
              </div>
          </DialogContent>
        </Dialog>

        {solicitacoes && (
          <>
            <h2 className="text-xl font-semibold text-google-grey font-roboto py-8">Solicitações</h2>
            <div className="w-auto flex flex-wrap justify-start">
              {[...new Array(2)].map((i, idx) => (
                <div key={"first-array-demo-2" + idx} className="flex space-x-2 justify-start space-y-2 pr-4">
                  <div className="h-20 w-20 animate-pulse rounded-full bg-google-black"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-40 animate-pulse rounded-sm bg-google-black"></div>
                    <div className="h-5 w-20 animate-pulse rounded-sm bg-google-black"></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <h2 className="text-xl font-semibold text-google-grey font-roboto pb-4 mt-4 lg:pb-8 lg:mt-4">Amigos</h2>
      <div className="w-auto flex flex-wrap justify-start">
        {[...new Array(5)].map((i, idx) => (
          <div key={"first-array-demo-1" + idx} className="flex space-x-2 justify-start space-y-2 pr-4">
            <div className="h-20 w-20 animate-pulse rounded-full bg-google-black"></div>
            <div className="space-y-2">
              <div className="h-5 w-40 animate-pulse rounded-sm bg-google-black"></div>
              <div className="h-5 w-20 animate-pulse rounded-sm bg-google-black"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default page