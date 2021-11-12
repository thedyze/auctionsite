import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Datepicker from "../components/Datepicker";
import { ImageUpload } from "../components/ImageUpload.jsx"
import { getThemeProps } from "@mui/system";

let formData = new FormData()

export const CreateListing = () => {

  const history = useHistory()

  const { currentUser } = useContext(UserContext)
  const [buyNowCheckBox, setBuyNowCheckBox] = useState(false)
  const [loginAlert, setLoginAlert] = useState(false)

  //dynamically gathers input values into an object which will be passed on submit
  const [auctionData, setAuctionData] = useState({
    title: "",
    description: "",
    category: 0,
    startPrice: 0,
    buyNowPrice: 0,
    endTime: new Date().getTime(),
  });



  const categories = [
    { id: 2, name: "Choose", value: "" },
    { id: 1, name: "Shoes", value: "Shoes" },
    { id: 4, name: "Accessories", value: "Accessories" },
    { id: 600, name: "Dresses", value: "Dresses" },
    { id: 603, name: "Shirts", value: "Shirts" },
    { id: 604, name: "Pants", value: "Pants" },
    { id: 602, name: "Hats", value: "Hats" },
    { id: 601, name: "Shorts", value: "Shorts" },
    { id: 605, name: "Jackets", value: "Jackets" }
  ]

  const handleFormSubmit = async (e, value) => {
    e.preventDefault()


    // It is not possible to create a listing without a logged in user 
    if (!currentUser) {
      setLoginAlert(true)
      return;
    }

    //time when submitted
    let currentDateAndTime = new Date();
    setAuctionData({ ...auctionData, startTime: currentDateAndTime.getTime() });

    let a = auctionData;
    let u = currentUser;
    let catId = "";
    categories.forEach((item) => { //get the id of the chosen category
      if (a.category === item.name) {
        catId = item.id
        return;
      }
    });

    let newAuctionObj = {
      userId: u.id,
      description: a.description,
      title: a.title,
      startTime: new Date().getTime(),
      endTime: a.endTime,
      currentBid: 0,
      startPrice: a.startPrice,
      categoryId: catId,
      buyNowPrice: a.buyNowPrice,
      imagePath: value
    };
    console.log("newAuctionObj before fetch", newAuctionObj);

    try {
      let res = await fetch("/rest/auctionItem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newAuctionObj)
      });
      res = await res.json();

      history.push(`/auction-details/${res.id}`)
    } catch (error) {
      console.log("the new listing was not submitted")
    }
  }




  //Image Upload functions
  const [preview1, setPreview1] = useState('src/images/upload.png')
  const [preview2, setPreview2] = useState('src/images/upload.png')
  const [preview3, setPreview3] = useState('src/images/upload.png')
  const [noFiles, setNoFiles] = useState(false)

  async function onAddImage(e, number) {
    const maxWidth = 2500
    const maxHeight = 1500

    try {
      let file = e.target.files[0]
      let image = new Image()
      image.src = URL.createObjectURL(file)

      image.onload = async () => {

        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height)
        const width = image.width * ratio + .5 | 0
        const height = image.height * ratio + .5 | 0
        canvas.width = width
        canvas.height = height

        ctx.drawImage(image, 0, 0, width, height)
        let compressedFile = dataURItoBlob(canvas.toDataURL('image/jpeg', 0.6))

        if (number === 1) {
          updateFormData('_img1.jpg', compressedFile)
          setPreview1(image.src)
        }

        if (number === 2) {
          updateFormData('_img2.jpg', compressedFile)
          setPreview2(image.src)
        }

        if (number === 3) {
          updateFormData('_img3.jpg', compressedFile)
          setPreview3(image.src)
        }
      }
    }
    catch (e) { console.error(e); }
  }


  function updateFormData(imgname, file) {

    const tempData = formData.getAll('files')
    formData.delete('files')

    tempData
      .filter(file => file.name !== imgname)
      .forEach(file => formData.append('files', file))

    formData.append('files', file, imgname)
  }


  async function onFilesSubmit(e) {
    e.preventDefault()

    if (formData.getAll('files').length === 0) {
      setNoFiles(true)
    }
    else
      try {
        let res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        res.json().then((r) => {
          let value = r.generatedString
          if (value) {
            handleFormSubmit(e, value)
          }
        })
      } catch (error) {
        console.error(e);

      }
  }





  return (
    <div>
      <div className="font-bold text-2xl text-center p-8">Create a listing</div>
      <div className="pt-8">Upload photo (max 3)</div>
      <div className="w-full p-4 flex justify-center font-medium text-indigo-600">
        Click an image to upload
      </div>
      <form className="">
        <div className="w-full h-32 px-8 grid grid-rows-2 grid-cols-3 gap-4">

          <div className="image-upload w-40 h-32 row-span-2 col-span-2">
            <label htmlFor="image1">
              <img className="object-cover max-h-32" src={preview1} alt="" />
            </label>
            <input id="image1" accept="image/*" type="file" onChange={e => onAddImage(e, 1)} />
          </div>

          <div className="image-upload">
            <label htmlFor="image2">
              <img className="object-cover max-h-16" src={preview2} alt="" />
            </label>
            <input accept="image/*" type="file" id="image2" onChange={e => onAddImage(e, 2)} />
          </div>

          <div className="image-upload">
            <label htmlFor="image3">
              <img className="object-cover max-h-16" src={preview3} alt="" />
            </label>
            <input accept="image/*" type="file" id="image3" onChange={e => onAddImage(e, 3)} />
          </div>
        </div >
        {noFiles && <div className="w-full text-center text-sm text-red-600">You must add at least one image</div>}
      </form>

      <form className="p-6" onSubmit={onFilesSubmit}>
        {/* Image upload */}


        {/* Title input */}
        <div className="pt-8">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="title"
              id="title"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Title"
              onChange={(e) => {
                setAuctionData((prev) => ({ ...prev, title: e.target.value }));
              }}
              required
            />
          </div>
        </div>

        {/* Description input */}
        <div className="pt-8">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="description"
              id="description"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Description"
              onChange={(e) => {
                setAuctionData((prev) => ({ ...prev, description: e.target.value }));
              }}
            />
          </div>
        </div>

        {/* Category input */}
        <div className="pt-8">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <div>
            <select
              id="category"
              name="category"
              className="w-full focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
              onChange={(e) => {
                setAuctionData((prev) => ({ ...prev, category: e.target.value }));
              }}
              required
            >
              {categories.map((cat) => <option value={cat.value} key={cat.id}>{cat.name}</option>)}
            </select>
          </div>
        </div>

        {/* Price input */}
        <div className="pt-8">
          <label htmlFor="starting-price" className="block text-sm font-medium text-gray-700">Starting price</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="starting-price"
              id="starting-price"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
              placeholder="0"
              onChange={(e) => {
                setAuctionData((prev) => ({ ...prev, startPrice: e.target.value }));
              }}
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                required
              >
                <option>SEK</option>
              </select>
            </div>
          </div>
        </div>

        {/* Buy Now input */}
        <div className="flex justify-between pt-8">
          <div className="flex items-center">
            <input
              id="buy-now"
              name="buy-now"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              onChange={(e) => {
                setBuyNowCheckBox(e.target.checked)
              }
              }
            />
            <label htmlFor="buy-now" className="ml-2 block text-sm text-gray-900">
              Buy now
            </label>
          </div>
          <div className="mt-1 relative rounded-md shadow-sm w-40">
            {buyNowCheckBox &&
              <input
                type="buy-now-price"
                name="buy-now-price"
                id="buy-now-price"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-2 sm:text-sm border-gray-300 rounded-md"
                placeholder="0"
                onChange={(e) => {
                  setAuctionData((prev) => ({ ...prev, buyNowPrice: e.target.value }));
                }}
              />
            }
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                required
              >
                <option>SEK</option>
              </select>
            </div>

          </div>
        </div>

        {/* Set end Date */}
        <div className="pt-8">
          <label htmlFor="end-date" className="ml-2 block text-sm text-gray-900">
            End Date
          </label>
          <Datepicker callback={setAuctionData} />
        </div>

        {/* Submit button */}
        <div className="flex justify-center pt-8">
          <button
            type="submit"
            className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Done
          </button>
        </div>
        {loginAlert && <div className="text-center text-myRe text-xs p-1">Sir, you need to login first</div>}
      </form>
    </div>
  );


};

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

