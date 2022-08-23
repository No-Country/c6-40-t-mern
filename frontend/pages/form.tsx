import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import modules from "../toolbarConfig/toolbarConfig";

interface formState{
  title: string,
  content: string,
  tags: string[]
}

const Form = () => {

  const [formState, setFormState] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const [tagState, setTagState] = useState("");

  const addTag = () =>{
    if(tagState.length > 0){
      setFormState((data):formState =>{
        return{
          ...data,
          tags: [...data.tags, tagState]
        }
      })
      setTagState("");
    }
  }

  const deleteTag = (tag:string) =>{
    setFormState((data): formState =>{
      return{
        ...data,
        tags: data.tags.filter(text => text !== tag)
      }
    })

  }

  return (
    <div className="w-full flex justify-center items-center">
      <form className="mt-32 bg-slate-700 p-5 rounded-md text-white items-center flex flex-col w-full md:w-4/5 lg:w-1/2 2xl:w-1/2">
        <span className="text-lg font-bold mb-4">Nueva publicación</span>
         <input className="w-full text-black p-3 rounded-md" type="text" placeholder="Titulo"/>
         {/* <textarea className="mt-4 w-full h-24 resize-none text-black p-3 rounded-md focus:h-80 transition-all" placeholder="Publicación" /> */}
         <div className="mt-4 w-full text-black bg-white  rounded-md  transition-all">
          <ReactQuill theme="snow" modules={modules} placeholder="Publicación"/>
         </div>
         <div className="flex w-full mt-4">
          <div className="bg-slate-600 p-3 rounded-md w-1/2 text flex flex-wrap ">
            {formState.tags.length <= 0 ? "No hay tags..." : formState.tags.map((tag,i) =>(
              <div key={i} className="flex">
                <span>{tag}</span>
                <button type="button" onClick={()=> deleteTag(tag)} >X</button>
              </div>
            ))}
          </div>
          <input className="text-black rounded-md p-3 ml-4 w-1/2" value={tagState} onChange={(e) => setTagState(e.target.value)} type="text" placeholder="Tag" />
          <button className="bg-[#a16207] rounded-md p-2 ml-4" onClick={addTag} type="button">Añadir</button>
    
         </div>
         <input type="file" />
         <button className="p-2 bg-[#a16207] w-52 mt-4 rounded-md hover:bg-yellow-600 transition" type="submit">Crear Publicación</button>
      </form>
    </div>
  );
};

export default Form;