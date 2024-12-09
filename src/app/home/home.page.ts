import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as tf from "@tensorflow/tfjs";
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  
  model!: tf.LayersModel;
  img: HTMLImageElement = new Image();
  imgTensor: tf.Tensor3D;
  imgIndex: number = 0;
  constructor(public photoService: PhotoService, public nav: NavController) {
    
  }
  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
    this.img.src = this.photoService.photos[this.imgIndex].webviewPath;
    this.img.onload = async () => {
      this.img.width = 240;
      this.img.height = 240;
      this.imgTensor = tf.browser.fromPixels(this.img).div(255);
      this.model = await tf.loadLayersModel("assets/model/model.json");
      let prediction = this.model.predict(this.imgTensor.reshape([1,240, 240, 3])) as tf.Tensor;
      prediction = prediction.squeeze();
      let outputInt = prediction.argMax().arraySync();
      let outputString = "";

      if (outputInt == 0){
        outputString = "positive";
      }
      else if (outputInt == 1){
        outputString = "negative";
      }
      else {
        outputString = "error";
      }
      this.nav.navigateForward('/results', { state: {output: outputString}});
      console.log(outputString);
    }
  }

  async ionViewDidEnter() {
    
  }

  loadModel(){
    
    
  }

}
