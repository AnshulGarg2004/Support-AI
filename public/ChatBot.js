
(function () {

    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/chat`;
    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data-owner-id");

    if(!ownerId) {
        console.log("Owner id not found");
        return;
    }

    const button = document.createElement('div');
    button.innerHTML = "🗨️";

    Object.assign(button.style, {
        position : "fixed",
        bottom : "24px",
        right : "24px",
        width : "56px",
        height : "56px",
        borderRadius : "50%",
        background : "#000",
        color : "#fff",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        cursor : "pointer",
        fontSize : "22px",
        boxShadow : "0 15px 40px rgba(0,0,0,0.35)",
        zIndex : "9999"
    });
    document.body.appendChild(button);

    const box = document.createElement('div');

    Object.assign(box.style, {
        position : "fixed",
        bottom : "90px",
        right : "24px",
        width : "320px",
        height : "420px",
        borderRadius : "14px",
        background : "#fff",
        display : "none",
        flexDirection : "column",
        boxShadow : "0 25px 60px rgba(0,0,0,0.25)",
        flexDirection : "column",
        overflow : "hidden",
        zIndex : 99999,
        fontFamily : "Inter, system-ui, sans-serif"
    })

    box.innerHTML=`<div style="background: #000; color: #fff; padding: 12px 14px; font-size: 14px; display: flex; justify-content: space-between; align-items: center;">
        <span>
            Customer Support
        </span>

        <span id="chat-close" style="cursor: pointer; font-size: 16px;">
            ✘
        </span>
    </div>

    <div id="chat-messages" style="flex: 1; padding: 12px; overflow-y: auto; background: #f9fafb; display: flex; flex-direction: column;">

    </div>

    <div style="display: flex; border-top: 1px solid #e5e7eb; padding: 8px; gap: 6px;">
        <input id="chat-input" style="flex: 1; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; outline: none;" type="text" placeholder="Type a message..."/>
        <button id="chat-send" style="cursor: pointer; border: none; color: #fff; background: #000; border-radius: 8px; font-size: 13px; " >Send</button>
    </div>`;

    document.body.appendChild(box);

    button.onclick = () => {
        box.style.display = box.style.display === "none" ? "flex" : "none";
    }

    document.querySelector("#chat-close").onclick = () => {
        box.style.display = "none";
    }

    const sendBtn = document.querySelector("#chat-send");
    const input = document.querySelector("#chat-input");
    const messageArea = document.querySelector("#chat-messages");

    function addMessage(text, from) {
        const bubble = document.createElement('div');
        bubble.innerText = text;
        Object.assign(bubble.style, {
            maxWidth : "78%",
            padding : "8px 12px",
            borderRadius : "14px",
            marginBottom : "8px",
            lineHeight : "1.4",
            fontSize : "13px",
            alignSelf : from === "user" ? "flex-end" : "flex-start",
            background : from === "user" ? "#000" : "#e5e7eb",
            color : from === "user" ? "#fff" : "#111",

            borderTopRightRadius : from === "user" ? "4px" : "14px",
            borderTopLeftRadius : from === "user" ? "14px" : "4px", 
        });

        messageArea.appendChild(bubble);
        messageArea.scrollTop = messageArea.scrollHeight;
    }

    sendBtn.onclick = async () => {
        const message = input.value.trim();
        if(!message) return;

        addMessage(message, "user");
        input.value = "";

        const typing = document.createElement('div');
        typing.innerText = "Typing...";
        Object.assign(typing.style, {
            fontSize : "12px",
            color : "#6b7280",
            marginBottom : "8px",
            alignSelf : "flex-start",
        });
        messageArea.appendChild(typing);
        messageArea.scrollTop = messageArea.scrollHeight;


        try {
            const response = await fetch(apiUrl, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ ownerId, message })
            });

            const data = response.json();

            messageArea.removeChild(typing);
            addMessage(data || "Something went wrong", "ai")
        } catch (error) {
            console.log("Error occured in fetching api chat: ", error);
            messageArea.removeChild(typing);
            addMessage(data || "Something went wrong", "ai")
            
        }
    }

})()