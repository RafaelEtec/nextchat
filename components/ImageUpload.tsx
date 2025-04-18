"use client";

import { ImageKitProvider, upload} from "@imagekit/next";
import config from '@/lib/config';
import React, { useState } from 'react'

const {
    env: {
        imageKit: { publicKey, urlEndpoint },
    },
} = config;

const authenticator = async () => {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Autenticação falhou: ${response.status}: ${errorText}`)
    }

    const data = await response.json();
    return {
        token: data.token,
        expire: data.expire,
        signature: data.signature,
    };
}

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const auth = await authenticator();

            const response = await upload({
                file,
                fileName: file.name,
                publicKey,
                ...auth,
            });

            if (response.url) {
                setFileUrl(response.url);
                onFileChange(response.url);
            } else {
                console.error("Upload response does not contain a valid URL.");
            }
        } catch (error: any) {
            console.error("Upload error:", error);
        }
    };

    return (
        <ImageKitProvider key={publicKey} urlEndpoint={urlEndpoint}>
            <div className="flex flex-col items-center gap-4">
                {fileUrl && (
                    <div className="gap-2">
                        <img src={fileUrl} alt="Imagem enviada" className="w-20 h-20 rounded-full"/>
                    </div>
                )}
                <input type="file" accept="image/*" onChange={handleUpload} className="font-roboto border rounded-2xl border-my-blue px-4"/>
            </div>
        </ImageKitProvider>
    )
}

export default ImageUpload;