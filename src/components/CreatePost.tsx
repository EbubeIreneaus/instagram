import React, { useState, useContext } from "react";
import Modal from "./Modal";
import axios from "axios";
import { ApiContext } from '..'

interface FileType {
  fileData: File;
  prevFile: string;
  type: string;
}

function CreatePost() {
  const [file, setFile] = useState<FileType | null>(null);
  const [nav, setNav] = useState<"file" | "text">("file");
  const [Caption, setCaption] = useState<string>("");
  const url = useContext(ApiContext)
  const profileId = localStorage.getItem('instagramId')

  const uploadPost = () => {
    const formdata = new FormData()
    formdata.append('file', file?.fileData as File)
    formdata.append('type', file?.type as string)
    formdata.append('caption', Caption)

    axios.post(`${url}/post/`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'profileId': profileId
      }
    })
    .then(res =>{
      alert(res.data)
    })
    .catch(err =>{
      console.error(err)
    })
  };

  const capturePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const pf = e.target?.result;
        if (file?.type.startsWith("image/")) {
          setFile({
            fileData: file as File,
            prevFile: pf as string,
            type: "image",
          });
        } else if (file?.type.startsWith("video/")) {
          setFile({
            fileData: file as File,
            prevFile: pf as string,
            type: "video",
          });
        } else {
        }
      };
    }
  };

  return (
    <div>
      <Modal display={true}>
        <>
          {nav === "file" ? (
            <div>
              <div className="flex justify-between py-1 ">
                <p className="  font-semibold text-lg capitalize">
                  create new post
                </p>
                <button
                  className=" font-semibold text-lg disabled:text-black/30"
                  disabled={file == null}
                  onClick={() => setNav("text")}
                >
                  next <i className="fa fa-arrow-right"></i>
                </button>
              </div>
              <div className="h-[400px]  my-3 flex items-center justify-center">
                {!file?.prevFile ? (
                  <input type="file" onChange={capturePost} />
                ) : file?.type === "image" ? (
                  <img
                    src={file.prevFile}
                    alt="preview"
                    className="max-w-full max-h-full object-cover"
                  />
                ) : (
                  <video
                    src={file.prevFile}
                    autoPlay
                    className="max-w-full max-h-full"
                  ></video>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between py-1 ">
                <button
                  className=" font-semibold text-lg disabled:text-black/30"
                  disabled={file == null}
                  onClick={() => setNav("file")}
                >
                  <i className="fa fa-angle-left mt-1"></i> back
                </button>

                <button
                  className=" font-semibold text-lg disabled:text-black/30"
                  disabled={file == null}
                  onClick={uploadPost}
                >
                  share <i className="fa fa-arrow-right"></i>
                </button>
              </div>

              <div>
                <textarea
                  placeholder="Write Caption"
                  className="w-full h-[200px] my-7 outline-none border p-2"
                  autoFocus
                  autoCorrect=""
                  value={Caption}
                  onChange={(e)=> setCaption(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
}

export default CreatePost;
