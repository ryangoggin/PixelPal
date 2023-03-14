import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./MessageForm.css";

function MessageForm() {
    // const dispatch = useDispatch();
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return "thunk in progress..."
        // return dispatch("insert create message thunk here")
        //   .catch(
        //     async (res) => {
        //       const data = await res.json();
        //       if (data && data.errors) setErrors(data.errors);
        //     }
        //   );
    };

    return (
        <div className='message-form-container'>
            <form className="message-form" onSubmit={handleSubmit}>
            {/* need to look into what frontend validation is done when sending a message over 2000 characters */}
            {/* <ul>
              {errors.map((error, idx) => (
                  <li key={idx} className="errors">{error}</li>
                ))}
            </ul> */}
            <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            />
            <button className="message-form-button message-form-text" type="submit" disabled={content.length > 2000}>Send</button>
            </form>
        </div>
    )
}


export default MessageForm;
