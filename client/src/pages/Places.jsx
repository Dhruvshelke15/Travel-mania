import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from './Perks';
import axios from 'axios';

export default function Places() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm font-style: italic">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });
    setAddedPhotos(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos[]', files[i]);
    }

    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then(response => {
        const { data: filenames } = response;
        setAddedPhotos(prev => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center cursor-pointer">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput('Title', '*Add a catchy title')}
            <input
              type="text"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
              placeholder="title"
            />

            {preInput('Address', '*Address of your place')}
            <input
              type="text"
              value={address}
              onChange={ev => setAddress(ev.target.value)}
              placeholder="address"
            />

            {preInput('Photos', '*The more the better!')}
            <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
              <input
                type="text"
                value={photoLink}
                onChange={ev => setPhotoLink(ev.target.value)}
                placeholder="Add using a link.."
              />
              <button
                onClick={addPhotoByLink}
                className=" bg-gray-200 grow p-3 rounded-2xl"
              >
                Add&nbsp;photos
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map(link => {
                  console.log(link);
                  <div className="h-32 flex">
                    <img
                      className="rounded-2xl w-full object-cover"
                      src={`http://localhost:4000/uploads/` + link}
                      alt=""
                    />
                  </div>;
                })}
              <label className="h-32 cursor-pointer flex items-center gap-1 justify-center cursor-pointer border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput('Description', '*describe the place!')}

            <textarea
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />
            {preInput('Perks', '*Select all the perks of this place')}
            <div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput('Extra Info', '*Tell more about this place')}

            <textarea
              value={extraInfo}
              onChange={ev => setExtraInfo(ev.target.value)}
            />
            {preInput(
              'Check in & out times',
              '*Mention time for check in & out'
            )}

            <div className="grid gap-2 sm: grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={ev => setCheckIn(ev.target.value)}
                  placeholder="14:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>

                <input
                  type="text"
                  value={checkOut}
                  onChange={ev => setCheckOut(ev.target.value)}
                  placeholder="10:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>

                <input
                  type="text"
                  value={maxGuests}
                  onChange={ev => setMaxGuests(ev.target.value)}
                  placeholder="4"
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
