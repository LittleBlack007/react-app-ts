// 头像动效
import React,{ ChangeEvent, useEffect, useState } from 'react';
import AvatarModule from './avatar.module.css';

function BeautyAvatar() {
    return <img className={AvatarModule.img} src={require('./avatarImgs/houzi-tou.png')} alt="头像1" />

}

export default BeautyAvatar;