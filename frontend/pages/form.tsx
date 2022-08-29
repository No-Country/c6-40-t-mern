import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import modules from "../toolbarConfig/toolbarConfig";

const Form = () => {

  const { user } = useAuth0()

  const [formState, setFormState] = useState({
    title: "",
    category: "",
    resume: "",
    tags: [],
  })
  const [content, setContent] = useState('')
  const [tagState, setTagState] = useState('')
  const [img, setImg] = useState()

  const [categories, setCategories] = useState([])

// <<<<<<< HEAD
//   // useEffect((): void => {
//   //   fetch('http://localhost:5000/api/v1/user/62fea6442b351f2d0bce250e')
//   //     .then(res => res.json())
//   //     .then(res => {
//   //       console.log(res)
//   //     })
//   //     .catch(err => {
//   //       console.log(err)
//   //     })
//   // })
// =======
  useEffect((): void => {
    fetch('http://localhost:5000/api/v1/category')
      .then(res => res.json())
      .then(res => {
        setCategories(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
// >>>>>>> 83eee4e2d5690af6c66300c35c900edf0b243336

  const addTag = () => {
    if (tagState.length > 0) {
      setFormState((data) => {
        return {
          ...data,
          tags: [...data.tags, tagState]
        }
      })
      setTagState("");
    }
  }

  const deleteTag = (tag: string) => {
    setFormState((data) => {
      return {
        ...data,
        tags: data.tags.filter(text => text !== tag)
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    const formData = new FormData()
    formData.append("img", img)
    formData.append("content", content)
    formData.append("author_id", user.sub)
    for (const prop in formState) {
      formData.append(prop, formState[prop])
    }

    fetch("http://localhost:5000/api/v1/article", {
      method: "POST",
      body: formData,
      //headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (

    <div className="w-full flex justify-center items-center">
      <form className="mt-32 bg-slate-700 p-5 rounded-md text-white items-center flex flex-col w-full md:w-4/5 lg:w-1/2 2xl:w-1/2" onSubmit={handleSubmit}>
        <span className="text-lg font-bold mb-4">Nueva publicación</span>
        <input className="w-full text-black p-3 rounded-md" type="text" placeholder="Titulo" name="title" onChange={handleChange} />
        <input className="w-full text-black p-3 rounded-md" type="textarea" placeholder="Resumen" name="resume" onChange={handleChange} />
        {categories.length > 0 ?
          <select name="category" onChange={handleChange}>
            {categories.map((category) => {
              return <option key={category.key} value={category.key}>{category.name}</option>
            })}
          </select> :
          <h4>No se han podido cargar las categorías</h4>
        }
        <div className="mt-4 w-full text-black bg-white  rounded-md  transition-all">
          <ReactQuill theme="snow" modules={modules} placeholder="Publicación" value={content} onChange={setContent} />
        </div>
        <div className="flex w-full mt-4">
          <div className="bg-slate-600 p-3 rounded-md w-1/2 text flex flex-wrap ">
            {formState.tags.length <= 0 ? "No hay tags..." : formState.tags.map((tag, i) => (
              <div key={i} className="flex">
                <span>{tag}</span>
                <button type="button" onClick={() => deleteTag(tag)} >X</button>
              </div>
            ))}
          </div>
          <input className="text-black rounded-md p-3 ml-4 w-1/2" value={tagState} onChange={(e) => setTagState(e.target.value)} type="text" placeholder="Tag" />
          <button className="bg-[#a16207] rounded-md p-2 ml-4" onClick={addTag} type="button">Añadir</button>

        </div>
        <input onChange={e => setImg(e.target.files[0])} type="file" />
        <button className="p-2 bg-[#a16207] w-52 mt-4 rounded-md hover:bg-yellow-600 transition" type="submit">Crear Publicación</button>
      </form>
    </div>
  )
}

export default Form;