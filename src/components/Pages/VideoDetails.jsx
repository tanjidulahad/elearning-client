import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation, useParams } from 'react-router';
import { useGetVideoNotesQuery, useGetWatchedVideoQuery, usePostVideoNotesMutation, usePostWatchedVideoMutation } from '../redux/services/videoapi';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { Progress } from 'antd';

const VideoDetails = () => {
    const { id } = useParams()
    const location = useLocation()
    const { videolink, videotitle, videodescription } = location.state
    const videoPlayer = useRef()
    const { userData } = useSelector((state) => state.auth)
    const { isLoading, isError, data } = useGetVideoNotesQuery({ email: userData?.email, videoid: id })
    const [saveNote, saveNoteResponse] = usePostVideoNotesMutation()
    const [saveWatchedVideoApi, watchedVideoApiResponse] = usePostWatchedVideoMutation()
    const { isLoading: getWatchedVideoLoading, isError: getWatchedVideoError, data: WatchedVideos } = useGetWatchedVideoQuery({ email: userData?.email })

    const [noteField, setNoteField] = useState("")

    const [functionCalled, setFunctionCalled] = useState(false);
    const [videoProgress, setVideoProgress] = useState(0)




    const handleProgress = (progress) => {
        if (progress.playedSeconds >= 5) {
            setVideoProgress(progress.playedSeconds)

        }
    };

    useEffect(() => {
        if (videoProgress >= 5 && !functionCalled) {
            saveWatchedVideoApi({ email: userData?.email, videoid: id })
            setFunctionCalled(true);
        }
    }, [videoProgress, functionCalled]);




    const formatTime = milliseconds => {
        const seconds = Math.floor((milliseconds / 1000) % 60).toString().padStart(2, "0");
        const minutes = Math.floor((milliseconds / 1000 / 60) % 60).toString().padStart(2, "0");
        const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24).toString().padStart(2, "0");

        return {
            hours, minutes, seconds
        }
    }

    const handleNoteSave = (e) => {
        e.preventDefault()
        const totalsec = videoPlayer?.current?.getCurrentTime()
        const totalmilisec = Math.floor(totalsec * 1000);
        const { hours, minutes, seconds } = formatTime(totalmilisec)

        const noteData = {
            email: userData.email,
            videoid: id,
            notedata: {
                content: noteField,
                time: hours !== "00" ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds
            }
        }
        saveNote(noteData)
            .unwrap()
            .then((res) => {
                toast.success("Note saved successfully")
                setNoteField("")
            })
            .catch((error) => {
                toast.error("Something went wrong")
            })

    }

    return (
        <div className='flex mt-4 ml-4 gap-8 flex-col-reverse md:flex-row'>
            <div className='video-player-container md:flex-[2]'>
                <div className='h-[70vh] w-[93vw] md:h-[65vh] md:w-[65vw]'>
                <ReactPlayer
                    ref={videoPlayer}
                    url={videolink}
                    onProgress={handleProgress}
                    height="100%"
                    width="100%"
                    controls
                />
                </div>
                <div className='space-y-3 pr-4'>
                    <p className='text-3xl mt-2 font-semibold'>{videotitle}</p>
                    <p className='font-medium text-gray-600'>{videodescription.slice(7, 400)}</p>
                </div>
            </div>
            <div className='md:flex-[1] shadow-md mr-8'>


                <div className='w-[80%] px-8 pt-2'>
                    <div>
                        <p className='text-base font-medium'>Completed</p>
                    </div>
                    <div className='flex gap-2 text-sm font-medium'>
                        <p>{WatchedVideos?.data ? `${WatchedVideos?.data?.watchedvideos?.length}/10` : "0/10"}</p>
                        <Progress status='active' strokeColor="#18B3C7" percent={(WatchedVideos?.data?.watchedvideos?.length / 10) * 100} format={(percent) => <p className='text-sm'>{`${percent} %`}</p>} />
                    </div>
                </div>



                <h3 className='text-2xl text-center font-medium text-gray-600'>Important Notes</h3>
                <form onSubmit={handleNoteSave} className='flex mt-3 px-8 gap-3'>
                    <input onChange={(e) => setNoteField(e.target.value)} value={noteField} className='w-full outline-[#18B3C7] border-[#18B3C7] border-[2px] rounded' type="text" />
                    <button disabled={noteField == "" ? true : false} type='submit' className={`bg-[#18B3C7] px-4 py-1 text-white rounded ${noteField == "" ? "cursor-not-allowed bg-[#18b3c7a8]" : ""}`}>Add</button>
                </form>

                <div className='mt-8 mx-8 shadow-[inset_5px_5px_7px_#d5d5d5,inset_-5px_-5px_7px_#ebebeb] h-[400px] rounded-lg overflow-hidden overflow-y-auto note-section'>
                    {!isLoading ?
                        data?.data ?
                            <ul className='mx-8 pt-4 pb-4 space-y-3'>
                                {data?.data?.notes?.map((note) => (
                                    <li className='list-disc'>{note.content}<span className='ml-2 text-red-500'>({note.time})</span></li>
                                ))}
                            </ul>
                            :
                            <p className='flex items-center justify-center h-full text-lg font-medium text-gray-400'>No notes Found</p>
                        :
                        <p className='flex items-center justify-center h-full text-lg font-medium text-gray-400'>loading...</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;