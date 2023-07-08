import React, {  useState } from 'react'
import '../../src/App.css'
import { Grid } from '@mui/material';
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
    {
        label: 'cuatro',
        imgPath:
          'https://scontent.flim1-1.fna.fbcdn.net/v/t39.30808-6/355286356_1909362176113249_7410329895312211555_n.jpg?stp=dst-jpg_p526x395&_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFHVhZ7WXr6c1byep05yGSTQYecgycu27FBh5yDJy7bsUmGezdNWlk-KYABljT3swKSmQagwRw9P0aLSYvHG-pC&_nc_ohc=y0hbpp-YYwsAX8wx2nw&_nc_ht=scontent.flim1-1.fna&oh=00_AfBSwlOwpW6W6SpUHfSuPW303F5Ud5kul2V1lt6BatOkXQ&oe=64989668',
      },
      {
        label: 'tres',
        imgPath:
          'https://scontent.flim1-2.fna.fbcdn.net/v/t39.30808-6/355337912_1909362202779913_1676036783157047187_n.jpg?stp=dst-jpg_p526x395&_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFbz2fBNNJokNtJ8GwDzA3X_BSBSrps4hn8FIFKumziGcXsZKrmMb0ojfpLsutf7TJr_4KbKSpfnBJ2D1NZRY-h&_nc_ohc=3ostz7gdc8AAX_73Gkt&_nc_ht=scontent.flim1-2.fna&oh=00_AfALgYbUPk7mx4FMyZ4b4i19m3Yq9qauQ4QaIuVahCCitg&oe=64992664',
      },
      {   
        label: 'dos',
        imgPath:
          'https://scontent.flim1-2.fna.fbcdn.net/v/t39.30808-6/355341328_1909362269446573_1829871786623157210_n.jpg?stp=dst-jpg_p526x395&_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFWuJCS_-JEyJRLYWXP4L1U7bKyrQAJSKTtsrKtAAlIpHX-2GukFGJ_zuinDCNfehOKcdzLWxSRpOMEfjckg9rK&_nc_ohc=98rrc35fkrYAX9F3Isk&_nc_ht=scontent.flim1-2.fna&oh=00_AfAZ3qZVMN3TOnqzs9DprLVlJnDn4_kIf3zaSiHncr68eA&oe=6497557D',
      },
      {
        label: 'uno',
        imgPath:
          'https://scontent.flim1-1.fna.fbcdn.net/v/t39.30808-6/355271686_1909362312779902_2976262942609843117_n.jpg?stp=dst-jpg_p526x395&_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeGjOHCYCUL03saYQ93lzTAn8e-f5GJIX8Hx75_kYkhfwbkczFfJCAiK4kuZ6HvCYZ-0Yx8WNHSn4EUL6HcXYqr-&_nc_ohc=6WnPaVxWST8AX8Uo761&_nc_ht=scontent.flim1-1.fna&oh=00_AfBAaIHuOBIlqlhsykBBw4K9b3xNg2o3Lt6bC6wk5JeM7Q&oe=64984C48',
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
