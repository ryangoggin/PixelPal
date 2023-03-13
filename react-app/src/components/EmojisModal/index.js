import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { useModal } from "../../context/Modal";
import "./GetAllEmojis.css"

function GetAllEmojis() {
  const dispatch = useDispatch()
  return (
    <h1> hello !</h1>
  )
}
