import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(menu, events){
    this.dropdownMenus = document.querySelectorAll(menu);
    
    // define touchstart e click como argumento padrão
    // de eventos caso o usuário não defina
    if (events === undefined) this.events =  ['touchstart', 'click'];
    else this.events = events;

    this.activeClass = 'active';
    this.actioveDropdownMenu = this.actioveDropdownMenu.bind(this);
  }
  

  // ativa o dropdownmenu e adiciona
  // a funcao que observa o clique fora dele
  actioveDropdownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  // adiciona os eventos ao dropdownmenu
  addDropdownsMenuEvent(){
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.actioveDropdownMenu);
      });
    });
  }
  
  init(){
    if (this.dropdownMenus.length) {
      this.addDropdownsMenuEvent();
    }
    return this;
  }
}
