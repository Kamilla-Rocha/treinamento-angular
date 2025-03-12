
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarImagem } from './validators/imagem.validator';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      idade: ['', [Validators.required, Validators.min(18)]],
      endereco: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      senha: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).{6,}$')]],
      confirmacaoSenha: ['', [Validators.required, this.senhasCoincidem]],
      sexo: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cidade: ['', Validators.required],
      aceitoTermos: [false, Validators.requiredTrue],
      descricao: ['', Validators.maxLength(500)],
      fotoPerfil: ['', [Validators.required, validarImagem]]  
    });
  }

  senhasCoincidem(control: any): { [key: string]: boolean } | null {
    const senha = control.root?.get('senha')?.value;
    if (senha && control.value !== senha) {
      return { 'senhasNaoCoincidem': true };
    }
    return null;
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulário enviado:', this.formulario.value);
    } else {
      console.log('Formulário inválido');
    }
  }
}



