import { Component, OnInit } from '@angular/core';
import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1: string;
  private numero2: string;
  private operacao: string;
  private resultado: number;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit() {
    this.limpar()
  }

  /** Inicializa todos os operadores para os valores padrão.
   * @return void
  */
  limpar(): void {
    this.numero1 = "0";
    this.numero2 = null;
    this.resultado = null;
    this.operacao = null;
  }

  /**Adiciona o npumero selecionado para o cálculo posteriormente .
   * @param numero string 
   * @return void
  */
  adicionarNumero(numero: string): void {
    if (this.operacao === null) {
      this.numero1 = this.concatenarNumero(this.numero1, numero);
    } else {
      this.numero2 = this.concatenarNumero(this.numero2, numero);
    }
  }

  /** Retorna o valor concatenado. Trata o separador decimal 
   * @param numAtual string 
   * @param numContact string
   * @return string
  */


  concatenarNumero(numAtual: string, numContact: string): string {
    //caso contenha apenas '0' ou null, reinicia o valor
    if (numAtual === '0' || numAtual === null) {
      numAtual = '';
    }
    // primeiro dígito é '.', concatena '0' anres do ponto
    if (numContact === '.' && numAtual === '') {
      return '0.';
    }
    // caso '.' digitado e já contenha '.' , aoenas retorna
    if (numContact === '.' && numAtual.indexOf('.') > -1) {
      return numAtual;
    }
    return numAtual + numContact;
  }
  /** Executa lógica quando um operador for selecionado. 
   * Caso já possua uma operação selecionada, executa a operaão anterior, 
   * e define a nova operação.
   * @param string operacao
   * @return void
   */
  definirOperacao(operacao: string): void {
    //apenas define a operação caso não exista uma
    if (this.operacao == null) {
      this.operacao = operacao;
      return;
    }
    /*caso operação definida e número 2 selecionado, edetua o cálculo da operacão*/
    if (this.numero2 !== null) {
      this.resultado = this.calculadoraService.calcular(
        parseFloat(this.numero1),
        parseFloat(this.numero2),
        this.operacao);
      this.operacao = operacao;
      this.numero1 = this.resultado.toString();
      this.numero2 = null;
      this.resultado = null;
    }
  }
  /** Efetua o cálculo de uma operação
   * @return void
   */

  calcular(): void {
    if (this.numero2 === null) {
      return;
    }

    this.resultado = this.calculadoraService.calcular(
      parseFloat(this.numero1),
      parseFloat(this.numero2),
      this.operacao);

  }

  /** Retorna o valor a ser exibido na tela da calculadora
   * @return string
   */

  get display(): string {
    if (this.resultado !== null) {
      return this.resultado.toString();
    }
    if (this.numero2 !== null) {
      return this.numero2;
    }
    return this.numero1;
  }
}
