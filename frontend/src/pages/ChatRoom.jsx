import React, { useState, useEffect, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import "../styles/chat.css";
import useMessageStore from "../store/useMessageStore";
import useAuthStore from "../store/useAuthStore";
import useSocketStore from "../store/useSocketStore";
import ChatHeader from "../components/ChatHeader";
import "../styles/skeleton.css";
import ChatSkeleton from "../skeletons/ChatSkeleton";

const Chat = () => {
    const chatRef = useRef(null);
    const textRef = useRef(null);
    const param = useParams();
    const [isLoaded, setLoaded] = useState(true);
    const [isPreview, setPreview] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const id = param.id;
    const {
        conversations,
        sendText,
        getMessages,
        setIsHeaderOff,
        isFetchingChats
    } = useMessageStore();
    const {messageListener, socket} = useSocketStore()
    const { authUser } = useAuthStore();
    const fileRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [text, setText] = useState("");

    const handleFile = e => {
        const selectedFiles = e.target.files;
        if (selectedFiles.length === 0) return;

        const fileArray = Array.from(selectedFiles);
        fileArray.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Image = reader.result;
                setFiles(prevFiles => [...prevFiles, base64Image]);
            };
            reader.onerror = error => {
                console.error("Error reading file:", error);
            };
        });
    };

    const sendMessage = async () => {
        if (!text && files.length === 0) return;
        await sendText({
            receiver_id: param.id,
            message: text.trim(),
            images: files
        });
        setFiles([]);
        setText("");
        chatRef.current.scrollIntoView({ behavior: "smooth" });
        textRef.current.focus();
    };

    const previewImg = data => {
        setPreviewData(data);
        setPreview(true);
    };
    const closePreviewImg = data => {
        setPreviewData(null);
        setPreview(false);
    };

    useEffect(() => {
        setIsHeaderOff(true);
    }, [setIsHeaderOff]);

    useEffect(() => {
        getMessages(id);
        messageListener(id)
    }, [getMessages, id,messageListener]);

    useEffect(() => {
        if (chatRef.current && conversations) {
            chatRef.current.scrollIntoView({ behavior: "smooth" });
            setLoaded(false);
        }
    }, [conversations]);

    return (
        <>
            <div className="chat-page">
                {isPreview && previewData && (
                    <div className="view-img-box">
                        <img
                            onClick={closePreviewImg}
                            id="close"
                            src="/icons/close.png"
                        />
                        <img className="img" src={previewData} />
                    </div>
                )}
                {isFetchingChats && <ChatSkeleton />}
                {conversations?.map((message, index) => (
                    <>
                        <div
                            key={message?._id}
                            className={
                                message?.sender_id === authUser?._id
                                    ? "sender chat-bubble img-container"
                                    : "receiver chat-bubble img-container"
                            }
                        >
                            {message.images && message.images.length != 0
                                ? message.images.map((img, imgId) => {
                                      return (
                                          <img
                                              key={imgId}
                                              onClick={() => {
                                                  previewImg(img);
                                              }}
                                              src={img}
                                          />
                                      );
                                  })
                                : message.message}
                        </div>
                    </>
                ))}
                {/*Chat Ref For Scroll Down*/}
                <div ref={chatRef}></div>
                {/* Showing Chat User Img */}
                <ChatHeader />
                <div className="bottom-bar">
                    <div className="preview-images">
                        {files.length > 0 &&
                            files.map((file, index) => (
                                <div key={index} className="img-box">
                                    <img id="prev" src={file} alt="preview" />
                                    <span>
                                        <img
                                            src="/icons/close.png"
                                            alt="remove"
                                        />
                                    </span>
                                </div>
                            ))}
                    </div>
                    <img
                        onClick={() => {
                            fileRef.current.click();
                        }}
                        src="/icons/add.png"
                        alt="add"
                    />
                    <input
                        ref={textRef}
                        onKeyDown={async e => {
                            if (e.key === "Enter") {
                                await sendMessage();
                            }
                        }}
                        onChange={e => {
                            setText(e.target.value);
                        }}
                        value={text}
                        type="text"
                        className="text"
                        placeholder="Type your message"
                    />
                    <img
                        onClick={sendMessage}
                        src="/icons/send.png"
                        alt="send"
                    />
                </div>
                <input
                    hidden={true}
                    onChange={handleFile}
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple={true}
                />
            </div>
        </>
    );
};

export default Chat;
