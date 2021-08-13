// import { Injectable } from '@angular/core';
// import { Store } from '@ngxs/store';
// import { AppActions } from '@state/app/app.actions';
// import { includes } from 'lodash';

// @Injectable({ providedIn: 'root' })
// export class ImageUploadService {
//     constructor(private store: Store) {
//     }

//     public upload(fileInput: any, uploadCallback: (imageData: string) => void): void {
//         if (fileInput.target.files && fileInput.target.files[0]) {
//             // Size Filter Bytes
//             const max_size = 20971520;
//             const allowed_types = ['image/png', 'image/jpeg'];
//             const max_height = 15200;
//             const max_width = 25600;

//             if (fileInput.target.files[0].size > max_size) {
//                 const imageError = 'O tamanho máximo da imagem é de ' + max_size / 1000 + 'Mb';
//                 this.store.dispatch(new AppActions.SendMessage({ severity: 'warning', summary: imageError }));
//                 return;
//             }

//             if (!includes(allowed_types, fileInput.target.files[0].type)) {
//                 const imageError = 'Somente imagens .jpeg e .png são permitidas';
//                 this.store.dispatch(new AppActions.SendMessage({ severity: 'warning', summary: imageError }));
//                 return;
//             }

//             const reader = new FileReader();

//             reader.onload = (event: any) => {
//                 const image = new Image();
//                 image.src = event.target.result;
//                 image.onload = rs => {
//                     const img_height = rs.currentTarget['height'];
//                     const img_width = rs.currentTarget['width'];

//                     if (img_height > max_height && img_width > max_width) {
//                         const imageError = 'Dimensões máximas permitidas: ' + max_width + 'x' + max_height + 'px';
//                         return;
//                     } else {
//                         const base64ImgData = event.target.result;

//                         uploadCallback(base64ImgData);
//                     }
//                 };
//             };

//             reader.readAsDataURL(fileInput.target.files[0]);
//         }
//     }
// }
