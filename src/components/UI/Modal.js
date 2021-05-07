import classes from './Modal.module.css'
import {Fragment} from 'react'
import ReactDom from 'react-dom'
const Backdrop = props =>{
    return <div className={classes.backdrop} onClick = {props.onClick}/>
}
const ModalOverlay = props =>{
    return <div className = {classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}
const overlays = document.getElementById('overlays');
const Modal = props =>{
    return<Fragment>
       {ReactDom.createPortal(<Backdrop onClick ={props.hide}/>,overlays)}
       {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,overlays)}
    </Fragment>
}

export default Modal