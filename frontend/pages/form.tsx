import { useEffect } from "react";

const Form = () => {

  useEffect(()=>{
    fetch('http://localhost:5000/api/v1/user/62fea6442b351f2d0bce250e')
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div>
      <p className="mt-20">Aca el formulario............</p>


    </div>
  );
};

export default Form;