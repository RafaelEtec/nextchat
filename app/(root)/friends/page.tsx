"use client";

import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { inviteByEmailSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { findAmigosById, findSolicitacoesById, inviteByEmail, respondInvite } from '@/lib/actions/relationsUsers';
import { findUserByEmail } from '@/lib/actions/users';
import { useSession } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const page = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [result, setResult] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageHeader, setMessageHeader] = useState<string>("");
  const [pageResult, setPageResult] = useState<boolean | null>(null);
  const [pageMessage, setPageMessage] = useState<string>("");
  const [pageMessageHeader, setPageMessageHeader] = useState<string>("");
  const {data: session} = useSession();
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[] | null>(null);
  const [amigos, setAmigos] = useState<User[] | null>(null);

  const fetchSolicitacoes = async () => {
    const result = await findSolicitacoesById(session?.user?.id!);
    setSolicitacoes(result);
  }

  const fetchAmigos = async () => {
    const result = await findAmigosById(session?.user?.id!);
    setAmigos(result);
  }

  useEffect(() => {
    fetchSolicitacoes();
    fetchAmigos();
  }, [session?.user?.id]);

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
    if (values.email === session?.user?.email) {
      setResult(false);
      setMessageHeader("Opa...");
      setMessage("Você não pode se convidar!");
      return;
    }

    setIsLoading(true);
    setIsVisible(true);
    const found = await findUserByEmail(values);
    setResult(found.success);
    setMessageHeader(found.messageHeader);
    setMessage(found.message);
    setIsLoading(false);
    setFoundUser(found.data);
  }

  const onSubmitInviteByEmail = async (values: z.infer<typeof inviteByEmailSchema>) => {
    if (!foundUser) return;
    setIsSending(true);
    EmailForm.setValue("friendId", foundUser.id);
    const result = await inviteByEmail({
      email: values.email,
      userId: session?.user?.id!,
      friendId: foundUser.id,
    });
    setIsVisible(true);
    setResult(result.success);
    setMessageHeader(result.messageHeader);
    setMessage(result.message);
    setIsSending(false);
    clearSpaces();

    fetchSolicitacoes();
  }

  const clearSpaces = () => {
    setFoundUser(null);
    EmailForm.setValue("email", "");
    EmailForm.setValue("friendId", "");
  }

  useEffect(() => {
    if (result !== null && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [result, isVisible]);

  const handleInvite = async (friendId: string, action: string) => {
    setIsSending(true);
    const result = await respondInvite(session?.user?.id!, friendId, action);
    setIsVisible(true);
    setPageResult(result.success);
    setPageMessageHeader(result.messageHeader);
    setPageMessage(result.message);
    setIsSending(false);

    fetchSolicitacoes();
    fetchAmigos();
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
              Convidar Amigos
              <img width={36} height={36} src="add.svg" alt="Add user"/>
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isSending ? "animate-pulse" : ""}`}>
            <DialogHeader>
              <DialogTitle className="text-my-blue text-2xl">Convide alguém pelo E-mail</DialogTitle>
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
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                  <Button onClick={EmailForm.handleSubmit(onSubmitFindUserByEmail)} type='submit' size="sm" className='mt-1 cursor-pointer'>
                    <img src="magnifier.svg" alt="Procurar" width={30} height={30}/>
                  </Button>
                </Form>
              </div>
            </div>
            <div className='font-roboto'>
                {isVisible && result != null && (
                  <Alert className={`border-${result ? "google-lg-green" : "google-lg-yellow"}`}>
                  <AlertTitle className={`flex flex-1 gap-2 text-${result ? "google-lg-green" : "google-lg-yellow"} font-roboto`}><img width={20} height={20} src={`${result ? "check_green.svg" : "question_yellow.svg"}`} alt={messageHeader}/>{messageHeader}</AlertTitle>
                  <AlertDescription className={`text-${result ? "google-lg-green" : "google-lg-yellow"} font-roboto`}>
                    {message}
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
                      <img src={foundUser.image} alt="" className="h-20 w-20 rounded-full bg-google-black"/>
                      <div>
                        <p>{foundUser.name}</p>
                        <p>{foundUser.email}</p>
                      </div>
                    </div>
                    <div className='w-full flex items-center'>
                      <Button onClick={EmailForm.handleSubmit(onSubmitInviteByEmail)} type='submit' size="sm" className='flex-1/4 mt-1 border border-my-blue text-my-blue h-10 cursor-pointer'>
                        Convidar
                        <img src="adduser.svg" alt="Procurar" width={30} height={30}/>
                      </Button>
                      <Button onClick={clearSpaces} type='button' size="sm" className='flex-1 mt-1 border border-google-grey text-google-grey ml-2 h-10 cursor-pointer'>
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
              {solicitacoes.map((solicitacao, idx) => (
                <div key={idx} className="flex space-x-2 justify-start space-y-4 pr-4">
                  <img src={solicitacao.user.image} alt="" className="h-20 w-20 rounded-full bg-google-black"/>
                  <div>
                    <p>{solicitacao.user.name}</p>
                    <p>{solicitacao.user.email}</p>
                    {solicitacao.status === "PENDING" && (
                      <div className='justify-evenly flex space-x-5'>
                        <Button onClick={() => handleInvite(solicitacao.friendId, "ACCEPT")}>
                          <img src="user_confirm.svg" alt="Confirm user invite" width={30} height={30} className='cursor-pointer'/>
                        </Button>
                        <Button onClick={() => handleInvite(solicitacao.friendId, "DECLINE")}>
                          <img src="user_decline.svg" alt="Decline user invite" width={30} height={30} className='cursor-pointer'/>
                        </Button>
                        {/* <img src="user_block.svg" alt="Block user invite" width={30} height={30} className='cursor-pointer'/> */}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <h2 className="text-xl font-semibold text-google-grey font-roboto pb-4 mt-4 lg:pb-8 lg:mt-4">Amigos</h2>
      <div className="w-auto flex flex-wrap justify-start">
        {amigos && (
          <>
            {amigos.map((amigo, idx) => (
              <div key={idx} className="flex space-x-2 justify-start space-y-4 pr-4">
                <img src={amigo?.image} alt="" className="h-20 w-20 rounded-full bg-google-black"/>
                <div>
                  <p>{amigo.name}</p>
                  <p>{amigo.email}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {pageResult != null && (
        <div>
          <Alert className={`border-${pageResult ? "google-lg-green" : "google-lg-yellow"}`}>
          <AlertTitle className={`flex flex-1 gap-2 text-${pageResult ? "google-lg-green" : "google-lg-yellow"} font-roboto`}><img width={20} height={20} src={`${pageResult ? "check_green.svg" : "question_yellow.svg"}`} alt={pageMessageHeader}/>{pageMessageHeader}</AlertTitle>
          <AlertDescription className={`text-${pageResult ? "google-lg-green" : "google-lg-yellow"} font-roboto`}>
            {pageMessage}
          </AlertDescription>
          </Alert>
        </div>
      )}
    </section>
  )
}

export default page