import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-sobre',
  template: `
    <h2>Sobre Nós</h2>
    <div class="content-container">
      <img src="https://guiadehospedagem.com.br/wp-content/uploads/2024/06/Leonardo_Diffusion_XL_A_stunning_portrait_of_a_beautiful_woman_1.jpg" alt="Imagem Pessoal">
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
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        </p>
        <p>
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
        </p>
      </article>
    </div>
    <div class="cards-container">
      <div class="card" tabindex="0">
        <h3>Autoestima</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Valorize-se e sinta-se bem.</p>
        <button>Saiba Mais</button>
      </div>
      <div class="card" tabindex="0">
        <h3>Valor</h3>
        <p>Oferecemos produtos de qualidade com o melhor custo-benefício para você.</p>
        <button>Saiba Mais</button>
      </div>
      <div class="card" tabindex="0">
        <h3>Preço</h3>
        <p>Preços justos e acessíveis para todos os nossos clientes.</p>
        <button>Saiba Mais</button>
      </div>
    </div>
    <section class="more-about">
      <h3>Mais Sobre a Loja</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, dapibus nulla at, cursus elit. 
        Praesent euismod, justo at facilisis cursus, lorem urna convallis nunc, nec tincidunt lorem elit nec metus. 
        Integer non libero nec nulla dapibus tincidunt. 
      </p>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      </p>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: block;
      padding: 40px 20px;
      background: linear-gradient(135deg, #ffeef5 0%, #ffe0f0 100%);
      min-height: 100vh;
    }
    h2 {
      color: #e91e8c;
      margin-bottom: 30px;
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(233, 30, 140, 0.2);
    }
    .content-container {
      display: flex;
      align-items: flex-start;
      gap: 30px;
      max-width: 1200px;
      margin: 0 auto 40px;
      background: rgba(255, 255, 255, 0.9);
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(233, 30, 140, 0.1);
    }
    img {
      max-width: 40%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(233, 30, 140, 0.15);
      transition: transform 0.3s ease;
    }
    img:hover {
      transform: scale(1.02);
    }
    article {
      font-family: 'Roboto', Arial, sans-serif;
      line-height: 1.7;
      color: #444;
      flex: 1;
    }
    article p {
      margin-bottom: 16px;
      text-align: justify;
    }
    .cards-container {
      display: flex;
      justify-content: space-between;
      margin: 40px auto;
      gap: 25px;
      max-width: 1200px;
    }
    .card {
      background: linear-gradient(135deg, #fff0f6 0%, #ffe8f1 100%);
      border-radius: 16px;
      padding: 25px;
      flex: 1;
      box-shadow: 0 4px 20px rgba(233, 30, 140, 0.12);
      transition: all 0.3s ease;
      cursor: pointer;
      outline: none;
      border: 2px solid transparent;
    }
    .card:hover, .card:focus {
      transform: translateY(-8px);
      box-shadow: 0 12px 35px rgba(233, 30, 140, 0.25);
      border-color: #f8a5d8;
    }
    .card h3 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #e91e8c;
      font-size: 1.4rem;
      font-weight: 600;
    }
    .card p {
      color: #555;
      line-height: 1.6;
      margin-bottom: 18px;
    }
    .card button {
      margin-top: 10px;
      padding: 12px 24px;
      background: linear-gradient(135deg, #e91e8c 0%, #f8a5d8 100%);
      border: none;
      color: white;
      border-radius: 25px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(233, 30, 140, 0.3);
    }
    .card button:hover {
      background: linear-gradient(135deg, #d41a7e 0%, #f58cc7 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(233, 30, 140, 0.4);
    }
    .more-about {
      margin: 40px auto 0;
      max-width: 1200px;
      font-family: 'Roboto', Arial, sans-serif;
      color: #444;
      background: rgba(255, 255, 255, 0.9);
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 6px 25px rgba(233, 30, 140, 0.1);
    }
    .more-about h3 {
      color: #e91e8c;
      margin-bottom: 20px;
      font-size: 1.8rem;
      font-weight: 600;
    }
    .more-about p {
      line-height: 1.7;
      margin-bottom: 16px;
      text-align: justify;
    }
    @media (max-width: 768px) {
      :host {
        padding: 20px 15px;
      }
      h2 {
        font-size: 2rem;
      }
      .content-container {
        flex-direction: column;
        gap: 20px;
        padding: 20px;
      }
      img {
        max-width: 100%;
      }
      .cards-container {
        flex-direction: column;
        gap: 20px;
      }
      .card {
        padding: 20px;
      }
      .more-about {
        padding: 20px;
      }
    }
  `],
  imports: [FooterComponent]
})
export class SobreComponent {}
