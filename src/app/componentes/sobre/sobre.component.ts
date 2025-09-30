import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  template: `
    <h2>Sobre Nós</h2>
    <img src="https://guiadehospedagem.com.br/wp-content/uploads/2024/06/Leonardo_Diffusion_XL_A_stunning_portrait_of_a_beautiful_woman_1.jpg" alt="Imagem Pessoal" style="max-width: 100%; height: auto; margin-bottom: 20px;">
    <article>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </article>
  `,
  styles: [`
    h2 {
      color: #e67e22;
      margin-bottom: 20px;
    }
    article {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    img {
      border-radius: 8px;
      display: block;
    }
  `]
})
export class SobreComponent {}
