import { useState } from 'react'

// export const ImageUpload = () => {
//   const [preview, setPreview] = useState('')
  // const [imgFile, setImgFile] = useState({
  //   file: '',
  // })
// create a holder to store files
let formData = new FormData()
console.log("formdata1" + formData)

export const ImageUpload = () => {
  const [preview, setPreview] = useState('')
  // const [images, setImages] = useState('')



  

  async function onFileLoad(e) {
    e.preventDefault()
    // let files = document.getElementById("image1").files
    let file = e.target.files[0]
    
    console.log(file);


    // add files to formData
    //  for (let file of files) {
      
    let image = new Image()
    image.src = URL.createObjectURL(file)
    
    
    console.log("imagesrc " +image.src)

      image.onload = async () => {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        
        canvas.width = image.width
        canvas.height = image.height

        ctx.drawImage(image, 0, 0)

        // compress image to 80% quality
        let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.8))
        
        // change file type to jpg
        formData.append('files', compressedFile, file.name.replace(/\.\w{3,5}$/, '.jpg'))

        // send files to server
        // let res = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData
        // })

        // let filePaths = await res.json()
        // console.log(filePaths);

        setPreview(image.src)
        console.log(formData);
        // clear input of files
        // e.target.value = ''
      // }

    }
  }

  async function Upload(e) {
    e.preventDefault()
    console.log(formData);
    let res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    let filePaths = await res.json()
    console.log(filePaths);
  }



    return (
      <div>
        <form className="" onSubmit={Upload}>
          <input accept="image/*" type="file" id="image1" onChange={onFileLoad} />
          <input accept="image/*" type="file" id="image2" onChange={onFileLoad} />
          
          <img className="max-h-32 " src={preview} alt="" />
          <button className="bg-blue-500 px-2" type="submit"> Upload Files </button>
        </form>
      </div>

    )
  }


  // export default ImageUpload;

  // helper function to convert canvas image to file
  // should be in a utility file
  function dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });
    return blob;
  }







//   }

//   return (
//     <div>
//       <input type="file" id="files" name="files" accept="image/*" multiple onChange={onFileLoad} />
//       <img src={preview} alt="" />
//     </div>

//   )
// }


// async function onFileLoad(e) {
    //   e.preventDefault()
    //   let file = imgFile
    //   console.log(imgFile.file.name);

    //   // create a holder to store files
    //   let formData = new FormData()

    //   // add files to formData
    //   // for (let file of files) {

    //     let image = new Image()
    //     image.src = URL.createObjectURL(file)

    //     image.onload = async () => {
    //       let canvas = document.createElement('canvas')
    //       let ctx = canvas.getContext('2d')
    //       canvas.width = image.width
    //       canvas.height = image.height

    //       ctx.drawImage(image, 0, 0)

    //       // compress image to 80% quality
    //       let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.8))

    //       // change file type to jpg
    //       formData.append('file', compressedFile, file.name.replace(/\.\w{3,5}$/, '.jpg'))

    //       // send files to server
    //       let res = await fetch('/api/upload', {
    //         method: 'POST',
    //         body: formData
    //       })

    //       let filePaths = await res.json()
    //       console.log(filePaths);

    //       setPreview(filePaths[0])
    //       // clear input of files
    //       e.target.value = ''
    //     }

    //   // }

    // }

    // const onFileChange = (e) => {
    //   // debugger
    //   setImages({
    //     images: e.target.files
    //   })

    // }
    // value = { imgFile.file }