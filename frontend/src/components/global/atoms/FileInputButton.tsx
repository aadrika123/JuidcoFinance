import React, { useRef, useState } from "react";
import { baseURL, Authorization } from '@/lib/axiosConfig';
import axios from "axios";

/**
 * | Author- Bijjoy Paitandi
 * | Created On- 18-04-2024
 * | Created for- File input button to be used in forms
 * | Status- done
 */

interface FileInputButtonProps {
  name: string;
}

const FileInputButton: React.FC<FileInputButtonProps> = (props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [progressValue, setProgressValue] = useState<number>(0);

  const axiosWithMultipartFormdata = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: Authorization,
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: progressEvent => {
      console.log(progressEvent);
      if (progressEvent.total) setProgressValue(progressEvent.loaded/progressEvent.total);
    }
  });


  const onChange = () => {
    // event.preventDefault();

    if (ref.current?.files) {
      const file = ref.current.files[0];

      const formData = new FormData();
      formData.append("pdf", file);


      axiosWithMultipartFormdata({
        method: 'post',
        url: '/file-handler/upload-single-pdf',
        data: formData
      },)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }




  return (
    <>
      <div className="flex flex-col">
        <div>
          <button className='rounded-2xl bg-primary_bg_indigo hover:text-grey text-white p-2' onClick={(event) => {
            if (ref) {
              (ref.current as HTMLInputElement).click();
            }
            event.preventDefault();
          }}>
            Upload
          </button>
          <input type="file" name={props.name} className='hidden' ref={ref} onChange={onChange} />

        </div>
        <div>
          <progress value={progressValue} />
        </div>
      </div>

    </>
  );
};

export default FileInputButton;