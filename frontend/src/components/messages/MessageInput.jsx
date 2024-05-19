import {useRef, useState} from "react";
import { BsSend,BsPaperclip } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import {getBase64} from "../../utils/base64.js";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage, sendImageMessage } = useSendMessage();
	const file = useRef(null)
	const [fileStr, setFileStr] = useState('')
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message, fileStr);
		setMessage("");
	};

	const handleFile = () => {
		file.current.click()
	}
	const handleChangeFile = async (files) => {
		const str = await getBase64(files.target.files[0])
		await sendImageMessage(str);
	}
	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Отправить сообщение'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button onClick={handleFile} type='button' className='absolute top-[14px] right-[25px] flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsPaperclip />}
				</button>
				<input type='file' onChange={handleChangeFile} hidden ref={file}/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
