import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-contato',
  template: `
    <div class="contact-wrapper">
      <div class="contact-container">
        <div class="contact-header">
          <h2>Entre em Contato</h2>
          <p class="subtitle">Estamos aqui para ajudar você! Preencha o formulário abaixo e responderemos em breve.</p>
        </div>

      <div class="contact-content">
        <div class="contact-info">
          <h3>Informações de Contato</h3>
          <div class="info-item">
            <i class="bi bi-geo-alt-fill"></i>
            <div>
              <strong>Endereço</strong>
              <p>Rua das Flores, 123<br>Centro - São Paulo, SP<br>01234-567</p>
            </div>
          </div>
          <div class="info-item">
            <i class="bi bi-telephone-fill"></i>
            <div>
              <strong>Telefone</strong>
              <p>(11) 1234-5678<br>(11) 98765-4321</p>
            </div>
          </div>
          <div class="info-item">
            <i class="bi bi-envelope-fill"></i>
            <div>
              <strong>E-mail</strong>
              <p>contato&#64;kall.com.br<br>atendimento&#64;kall.com.br</p>
            </div>
          </div>
          <div class="info-item">
            <i class="bi bi-clock-fill"></i>
            <div>
              <strong>Horário de Atendimento</strong>
              <p>Segunda a Sexta: 8h às 18h<br>Sábado: 8h às 14h</p>
            </div>
          </div>
        </div>

        <div class="contact-form-container">
          <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nome Completo <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  [(ngModel)]="contact.name" 
                  required 
                  minlength="2"
                  class="form-control"
                  placeholder="Digite seu nome completo"
                />
                <div class="error-message" *ngIf="contactForm.submitted && !contact.name">
                  Nome é obrigatório
                </div>
              </div>
              <div class="form-group">
                <label for="email">E-mail <span class="required">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  [(ngModel)]="contact.email" 
                  required 
                  email
                  class="form-control"
                  placeholder="Digite seu e-mail"
                />
                <div class="error-message" *ngIf="contactForm.submitted && !contact.email">
                  E-mail é obrigatório
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">Telefone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  [(ngModel)]="contact.phone" 
                  class="form-control"
                  placeholder="(11) 12345-6789"
                />
              </div>
              <div class="form-group">
                <label for="subject">Assunto <span class="required">*</span></label>
                <select 
                  id="subject" 
                  name="subject" 
                  [(ngModel)]="contact.subject" 
                  required
                  class="form-control"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="duvida">Dúvida sobre produto</option>
                  <option value="pedido">Informações sobre pedido</option>
                  <option value="devolucao">Devolução/Troca</option>
                  <option value="elogio">Elogio</option>
                  <option value="reclamacao">Reclamação</option>
                  <option value="sugestao">Sugestão</option>
                  <option value="outros">Outros</option>
                </select>
                <div class="error-message" *ngIf="contactForm.submitted && !contact.subject">
                  Assunto é obrigatório
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="message">Mensagem <span class="required">*</span></label>
              <textarea 
                id="message" 
                name="message" 
                [(ngModel)]="contact.message" 
                required 
                minlength="10"
                rows="5"
                class="form-control"
                placeholder="Descreva sua mensagem detalhadamente..."
              ></textarea>
              <div class="error-message" *ngIf="contactForm.submitted && !contact.message">
                Mensagem é obrigatória (mínimo 10 caracteres)
              </div>
            </div>

            <div class="lgpd-section">
              <div class="lgpd-checkbox">
                <input 
                  type="checkbox" 
                  id="lgpd" 
                  name="lgpd" 
                  [(ngModel)]="contact.lgpdAccepted" 
                  required
                />
                <label for="lgpd" class="checkbox-label">
                  <span class="required">*</span> Eu aceito a <strong>Política de Privacidade</strong> e os <strong>Termos e Condições</strong>
                </label>
              </div>
              <div class="lgpd-info">
                <div class="privacy-policy">
                  <h4><i class="bi bi-shield-check"></i> Política de Privacidade</h4>
                  <p>A sua privacidade é importante para nós. É política do Kall respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Kall, e outros sites que possuímos e operamos.</p>
                  
                  <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
                  
                  <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
                  
                  <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                  
                  <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>
                  
                  <p>Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</p>
                  
                  <p>O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.</p>
                  
                  <h5>Google AdSense e Cookies</h5>
                  <p>O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.</p>
                  
                  <p>Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível.</p>
                  
                  <h5>Compromisso do Usuário</h5>
                  <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Kall oferece no site:</p>
                  <p>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;</p>
                  <p>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</p>
                  <p>C) Não causar danos aos sistemas físicos e lógicos do Kall, de seus fornecedores ou terceiros.</p>
                  
                  <h4><i class="bi bi-file-text"></i> Termos e Condições</h4>
                  <p><strong>1. Termos:</strong> Ao acessar o site Kall, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                  
                  <p><strong>2. Uso de Licença:</strong> É concedida permissão para visualização pessoal e não comercial. Não é permitido modificar, copiar para fins comerciais ou fazer engenharia reversa do software.</p>
                  
                  <p><strong>3. Isenção de Responsabilidade:</strong> Os materiais são fornecidos 'como estão'. O Kall não oferece garantias expressas ou implícitas.</p>
                  
                  <p><strong>4. Limitações:</strong> O Kall não será responsável por danos decorrentes do uso ou incapacidade de usar os materiais.</p>
                  
                  <p><strong>5. Precisão dos Materiais:</strong> Os materiais podem incluir erros técnicos, tipográficos ou fotográficos.</p>
                  
                  <p><strong>6. Links:</strong> Não somos responsáveis pelo conteúdo de sites vinculados.</p>
                  
                  <p class="policy-date"><strong>Esta política é efetiva a partir de 21 de Outubro de 2025.</strong></p>
                </div>
              </div>
              <div class="error-message" *ngIf="contactForm.submitted && !contact.lgpdAccepted">
                É obrigatório aceitar os termos da LGPD
              </div>
            </div>

            <div class="form-actions">
              <button 
                type="button" 
                class="btn-secondary"
                (click)="resetForm(contactForm)"
              >
                <i class="bi bi-arrow-clockwise"></i>
                Limpar Formulário
              </button>
              <button 
                type="submit" 
                class="btn-primary"
                [disabled]="!contactForm.form.valid || isSubmitting"
              >
                <i class="bi bi-send-fill" *ngIf="!isSubmitting"></i>
                <i class="bi bi-hourglass-split" *ngIf="isSubmitting"></i>
                {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="success-message" *ngIf="submitted">
        <div class="success-content">
          <i class="bi bi-check-circle-fill"></i>
          <h3>Mensagem Enviada com Sucesso!</h3>
          <p>Obrigado pelo contato, <strong>{{ contact.name }}</strong>!</p>
          <p>Recebemos sua mensagem e responderemos em breve no e-mail: <strong>{{ contact.email }}</strong></p>
          <button class="btn-primary" (click)="resetSuccess()">
            <i class="bi bi-plus-circle"></i>
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    
    :host {
      display: block;
      background: linear-gradient(135deg, #ffeef5 0%, #ffe0f0 100%);
      min-height: 100vh;
      padding: 0;
    }

    .contact-wrapper {
      padding: 40px 20px 0 20px;
      min-height: calc(100vh - 200px);
    }

    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .contact-header {
      text-align: center;
      margin-bottom: 50px;
    }

    .contact-header h2 {
      color: #e91e8c;
      font-size: 2.8rem;
      font-weight: 700;
      margin-bottom: 15px;
      text-shadow: 0 2px 4px rgba(233, 30, 140, 0.2);
    }

    .subtitle {
      color: #666;
      font-size: 1.2rem;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 50px;
      margin-bottom: 40px;
    }

    .contact-info {
      background: rgba(255, 255, 255, 0.9);
      padding: 35px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(233, 30, 140, 0.1);
      height: fit-content;
    }

    .contact-info h3 {
      color: #e91e8c;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      margin-bottom: 25px;
      padding: 15px;
      background: linear-gradient(135deg, #fff0f6 0%, #ffe8f1 100%);
      border-radius: 12px;
      transition: transform 0.3s ease;
    }

    .info-item:hover {
      transform: translateX(5px);
    }

    .info-item i {
      color: #e91e8c;
      font-size: 1.3rem;
      margin-top: 2px;
      width: 20px;
    }

    .info-item strong {
      color: #e91e8c;
      font-size: 1rem;
      display: block;
      margin-bottom: 5px;
    }

    .info-item p {
      color: #555;
      line-height: 1.5;
      margin: 0;
    }

    .contact-form-container {
      background: rgba(255, 255, 255, 0.95);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(233, 30, 140, 0.12);
    }

    .contact-form {
      width: 100%;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-group label {
      display: block;
      color: #333;
      font-weight: 600;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .required {
      color: #e91e8c;
      margin-left: 3px;
    }

    .form-control {
      width: 100%;
      padding: 14px 16px;
      border: 2px solid #f0f0f0;
      border-radius: 12px;
      font-size: 1rem;
      font-family: 'Roboto', Arial, sans-serif;
      transition: all 0.3s ease;
      background: #fafafa;
    }

    .form-control:focus {
      outline: none;
      border-color: #e91e8c;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(233, 30, 140, 0.1);
    }

    .form-control:invalid:not(:placeholder-shown) {
      border-color: #dc3545;
    }

    select.form-control {
      cursor: pointer;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 120px;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 5px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .error-message::before {
      content: "⚠";
    }

    .lgpd-section {
      background: linear-gradient(135deg, #fff5f9 0%, #ffe8f2 100%);
      padding: 25px;
      border-radius: 15px;
      border: 2px solid #f8a5d8;
      margin: 30px 0;
    }

    .lgpd-checkbox {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 15px;
    }

    .lgpd-checkbox input[type="checkbox"] {
      width: 18px;
      height: 18px;
      margin-top: 2px;
      cursor: pointer;
    }

    .checkbox-label {
      cursor: pointer;
      color: #333;
      line-height: 1.5;
      font-size: 0.95rem;
    }

    .lgpd-info {
      background: rgba(255, 255, 255, 0.7);
      padding: 15px;
      border-radius: 10px;
      border-left: 4px solid #e91e8c;
    }

    .lgpd-info p {
      margin: 0;
      color: #555;
      font-size: 0.9rem;
      line-height: 1.6;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .lgpd-info i {
      color: #e91e8c;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .privacy-policy {
      max-height: 400px;
      overflow-y: auto;
      padding: 15px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
      margin-top: 10px;
    }

    .privacy-policy h4 {
      color: #e91e8c;
      font-size: 1.1rem;
      font-weight: 600;
      margin: 15px 0 10px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .privacy-policy h4:first-child {
      margin-top: 0;
    }

    .privacy-policy h5 {
      color: #e91e8c;
      font-size: 1rem;
      font-weight: 600;
      margin: 12px 0 8px 0;
    }

    .privacy-policy p {
      color: #555;
      font-size: 0.85rem;
      line-height: 1.5;
      margin: 8px 0;
      text-align: justify;
    }

    .policy-date {
      font-weight: 600;
      color: #e91e8c;
      text-align: center;
      margin-top: 20px;
      padding: 10px;
      background: rgba(233, 30, 140, 0.1);
      border-radius: 8px;
    }

    .privacy-policy::-webkit-scrollbar {
      width: 6px;
    }

    .privacy-policy::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }

    .privacy-policy::-webkit-scrollbar-thumb {
      background: #e91e8c;
      border-radius: 3px;
    }

    .privacy-policy::-webkit-scrollbar-thumb:hover {
      background: #d41a7e;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
    }

    .btn-primary, .btn-secondary {
      padding: 14px 28px;
      border: none;
      border-radius: 25px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 160px;
      justify-content: center;
    }

    .btn-primary {
      background: linear-gradient(135deg, #e91e8c 0%, #f8a5d8 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(233, 30, 140, 0.3);
    }

    .btn-primary:hover:not(:disabled) {
      background: linear-gradient(135deg, #d41a7e 0%, #f58cc7 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(233, 30, 140, 0.4);
    }

    .btn-primary:disabled {
      background: linear-gradient(135deg, #ccc 0%, #ddd 100%);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .btn-secondary {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      color: #666;
      border: 2px solid #dee2e6;
    }

    .btn-secondary:hover {
      background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
      color: #495057;
      transform: translateY(-1px);
    }

    .success-message {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(233, 30, 140, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    }

    .success-content {
      background: white;
      padding: 50px 40px;
      border-radius: 20px;
      text-align: center;
      max-width: 500px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: successSlideIn 0.5s ease;
    }

    @keyframes successSlideIn {
      from {
        opacity: 0;
        transform: translateY(-50px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .success-content i {
      color: #28a745;
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .success-content h3 {
      color: #e91e8c;
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .success-content p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 15px;
    }

    @media (max-width: 768px) {
      .contact-wrapper {
        padding: 20px 15px 0 15px;
      }

      .contact-header h2 {
        font-size: 2.2rem;
      }

      .contact-content {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .contact-info, .contact-form-container {
        padding: 25px;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }

      .form-actions {
        flex-direction: column;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
      }

      .success-content {
        margin: 20px;
        padding: 35px 25px;
      }
    }

    @media (max-width: 480px) {
      .contact-wrapper {
        padding: 15px 10px 0 10px;
      }

      .contact-header h2 {
        font-size: 1.8rem;
      }

      .subtitle {
        font-size: 1rem;
      }

      .contact-info, .contact-form-container {
        padding: 20px;
      }

      .info-item {
        padding: 12px;
      }
    }
  `],
  standalone: true,
  imports: [FormsModule, CommonModule, FooterComponent]
})
export class ContatoComponent {
  contact = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    lgpdAccepted: false
  };
  
  submitted = false;
  isSubmitting = false;

  onSubmit() {
    if (this.isFormValid()) {
      this.isSubmitting = true;
      
      // Simulate API call delay
      setTimeout(() => {
        this.submitted = true;
        this.isSubmitting = false;
        console.log('Contact form submitted:', this.contact);
        
        // Here you would typically send the data to your backend API
        // Example: this.contactService.sendMessage(this.contact).subscribe(...)
      }, 2000);
    }
  }

  resetForm(form: any) {
    form.resetForm();
    this.contact = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      lgpdAccepted: false
    };
  }

  resetSuccess() {
    this.submitted = false;
    this.contact = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      lgpdAccepted: false
    };
  }

  private isFormValid(): boolean {
    return !!(
      this.contact.name &&
      this.contact.email &&
      this.contact.subject &&
      this.contact.message &&
      this.contact.message.length >= 10 &&
      this.contact.lgpdAccepted
    );
  }
}
