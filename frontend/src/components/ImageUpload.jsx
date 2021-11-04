import { useState } from 'react'

// export const ImageUpload = () => {
//   const [preview, setPreview] = useState('')
// const [imgFile, setImgFile] = useState({
//   file: '',
// })
// create a holder to store files
let formData = new FormData()


export const ImageUpload = () => {
  const [preview1, setPreview1] = useState('src/images/upload.png')
  const [preview2, setPreview2] = useState('src/images/upload.png')
  const [preview3, setPreview3] = useState('src/images/upload.png')





  async function onFileLoad(e, number) {

    //let files = document.getElementById("image1").files

    let file = e.target.files[0]
    console.log(file);

    let image = new Image()
    image.src = URL.createObjectURL(file)

    image.onload = async () => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')

      canvas.width = image.width
      canvas.height = image.height

      ctx.drawImage(image, 0, 0)

      // compress image to 80% quality
      let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.6))

      // change file type to jpg
      // formData.set('files', compressedFile, file.name.replace(/\.\w{3,5}$/, '.jpg'))

      if (number === 1) {
        refreshFormData('image1.jpg')
        formData.append('files', compressedFile, 'image1.jpg')
        setPreview1(image.src)
      }
      if (number === 2) {
        refreshFormData('image2.jpg')
        formData.append('files', compressedFile, 'image2.jpg')
        setPreview2(image.src)
        
      }
      if (number === 3) {
        refreshFormData('image3.jpg')
        formData.append('files', compressedFile, 'image3.jpg')
        setPreview3(image.src)
      }

      // for (var value of formData.values()) {
 
      //   console.log("values" ,value.name);
      // }
       let temp = formData.getAll('files')
       console.log("formdata late", temp);

      // e.target.value = ''


    }
  }

  function refreshFormData(imgname) {

    const tmpData = formData.getAll('files')

    formData.delete('files')
    console.log("formdata1", formData.getAll('files'))

    tmpData
      .filter(file => file.name !== imgname)
      .forEach(file => formData.append('files', file))
  }

  async function onFilesUpload(e) {

    e.preventDefault()
    console.log(formData);
    let res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    let filePaths = await res.json()
    console.log(filePaths);
  }

  // function handlePreview(number) {
  //     document.getElementById(`image${number}`).src=
  // }



  return (
    <div>
      <div className="w-full p-4 flex justify-center font-medium text-indigo-600">
        Click an image to add
      </div>
      <form className="" onSubmit={onFilesUpload}>
        <div className="w-full h-32 px-8 grid grid-rows-2 grid-cols-3 gap-4">

          <div className="image-upload w-40 h-32 row-span-2 col-span-2">
            <label htmlFor="image1">
              <img className="object-cover max-h-32" src={preview1} alt="" />
            </label>
            <input id="image1" accept="image/*" type="file" onChange={e => onFileLoad(e, 1)} />
          </div>

          <div className="image-upload">
            <label htmlFor="image2">
              <img className="object-cover max-h-16" src={preview2} alt="" />
            </label>
            <input accept="image/*" type="file" id="image2" onChange={e => onFileLoad(e, 2)} />
          </div>

          <div className="image-upload">
            <label htmlFor="image3">
              <img className="object-cover max-h-16" src={preview3} alt="" />
            </label>
            <input accept="image/*" type="file" id="image3" onChange={e => onFileLoad(e, 3)} />
          </div>

        </div >
        
        <button className="bg-blue-500 px-2 mt-6 " type="submit"> Upload Files </button>
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