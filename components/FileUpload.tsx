/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useRef, useState } from 'react'

import { IKImage, ImageKitProvider, IKUpload} from "imagekitio-next";
import config from "@/lib/config";
import Image from 'next/image'; 
import { toast } from '@/hooks/use-toast';


const {
    env: {
      imagekit: { publicKey,  urlEndpoint },
    },
  } = config;
  
//   const imagekit = new ImageKit({ publicKey, urlEndpoint });

const authenticator = async () => {
    try {
      const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
  
      if (!response.ok) {
        const errorText = await response.text();
  
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }
  
      const data = await response.json();
  
      const { signature, expire, token } = data;
  
      return { token, expire, signature };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

const FileUpload = ({
    
    onFileChange,
    
  }:{onFileChange:(filePath : string)=>void} ) => {
    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string} | null >(null);

    const onError = (error: any) => {
        console.log(error);
    
        toast({
          title: `type upload failed`,
          description: `Your type could not be uploaded. Please try again.`,
          variant: "destructive",
        });
      };
    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);
    
        toast({
          title: `type uploaded successfully`,
          description: `${res.filePath} uploaded successfully!`,
        });
      };
   


    // const styles = {
    //     button:
         
    //           "bg-dark-300"
            
       
       
    //   };

  return (
    <ImageKitProvider 
    publicKey={publicKey}
    urlEndpoint={urlEndpoint}
    authenticator={authenticator}>

        <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        className="hidden"
        fileName='test-upload.png'
        />

<button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={"text-base"}>placeholder</p>

        {file && (
          <p className={"upload-filename"}>{file.filePath}</p>
        )}
      </button>

      {file &&
      <IKImage 
      alt={file.filePath}
      path={file.filePath}
      width={500}
      height={300}
     
      />}

    </ImageKitProvider>
  )
}

export default FileUpload