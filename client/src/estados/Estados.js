import React, { useRef, useState } from 'react'
import '../../src/App.css'
import { Grid } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
const images = [
    {
      label: 'San Francisco – Oakland Bay Bridge, United States',
      imgPath:
        'https://scontent.flim1-1.fna.fbcdn.net/v/t39.30808-6/355308354_1909355776113889_6971344455924100905_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGfIA--sMPMwF2SFckhXuL1TbXpbRjz8GhNteltGPPwaPOtkoHBVPVACj27EJRAeQuKHApyID4xAQBIKebUZgd9&_nc_ohc=FRoP6QctE3oAX-9hCQ8&_nc_ht=scontent.flim1-1.fna&oh=00_AfBG-zZizdID-nhGWvwgh5K3KmanQ4QCFq9CaA2nzQ9U8g&oe=6498B306',
    },
    {
      label: 'Bird',
      imgPath:
        'https://scontent.flim1-2.fna.fbcdn.net/v/t39.30808-6/355090001_1909357426113724_405353275840389910_n.jpg?stp=dst-jpg_p526x395&_nc_cat=110&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeHen4kN0puI-kNBO_o3ESdAlQZZOXuIwU2VBlk5e4jBTWg5hg8VmRxmzQlIMUT5ImCJ2-IGCbAE457U9DUm4Yrp&_nc_ohc=ghaonAe50L0AX-PwWt6&_nc_ht=scontent.flim1-2.fna&oh=00_AfBAHBvo1g9Uq__b8hmmMwQQpCTfNEpIWmxNQdgsBjtz0Q&oe=6499296E',
    },
    {
      label: 'Bali, Indonesia',
      imgPath:
        'https://scontent.flim1-2.fna.fbcdn.net/v/t39.30808-6/355321764_1909357332780400_2219011159649305341_n.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFOTIQnR5hvcXm4Z8VeJupUJQigclv9CPAlCKByW_0I8Kzb__ULA2i2YHacQPZxLYOvjI58MZBKckMOTmFe8e5L&_nc_ohc=WvsdNaZFhwUAX_S5inP&_nc_ht=scontent.flim1-2.fna&oh=00_AfB_OqE8Se59fKxJhSImAVB718MrxnEpyIMLHLUT9s4ZwQ&oe=64981E9F',
    },
    {
      label: 'Goč, Serbia',
      imgPath:
        'https://scontent.flim1-1.fna.fbcdn.net/v/t39.30808-6/355021940_1909357396113727_8530569313302086354_n.jpg?stp=dst-jpg_p526x395&_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeG5KQayORGHNYk3TtvZiQQhFK2qeuWMb8gUrap65YxvyNW2qGLDVoQ6veWeiDx_XVGmIiS6qo56ydNnDisq9tLG&_nc_ohc=B8UQfNwsORQAX-NzCo7&_nc_ht=scontent.flim1-1.fna&oh=00_AfCZWMx9zH0ono2tngGtjfNgXMBkkxP5AZ-CqOBtIKT99Q&oe=649920EF',
    },
  ];
const Estados = () => {
   
    let indexImages=0;
    const [currentImage,setCurrentImage] = useState(images[indexImages].imgPath);
   
    /* console.log(sliderRef);
    let index =1;
    setInterval(()=>{
        let porcentaje = index*-100;
        sliderRef.current.style.transform=`traslateX(${porcentaje}%)`;
        index ++;
        if (index> images.length-1) {
            index=0;
        }
        
    },1000); */
    const handleChangeImage=()=>{
        if (indexImages>images.length-1) {
            indexImages=0;
        }else{
            indexImages++;
        }
        console.log(indexImages);
        setCurrentImage(images[indexImages].imgPath);
    }
  return (
    <Grid container spacing={1}>
        <Grid item xs={12}>
            <div className='slider' >
                {images.map(image=><img key={image.label} src={image.imgPath}/>)}
                {/* <img src={currentImage} onClick={handleChangeImage}/> */}
            </div>
        </Grid>
    </Grid>
  )
}

export default Estados
