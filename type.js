(function(root){
  class CType {
    constructor(selector, options = {}) {
      this.element = document.querySelector(selector);
      this.text = options.text || '';
      this.speed = options.speed || 100;
      this.loop = options.loop || false;
      this.index = 0;
      this.isTyping = false;
    }


  
    go() {
      if (this.isTyping) return this;
      this.isTyping = true;

      const type = () => {
        if (this.index < this.text.length) {
          this.element.textContent += this.text.charAt(this.index);
          this.index++;
          setTimeout(type, this.speed);
        } else if (this.loop) {
          setTimeout(() => {
            this.element.textContent = '';
            this.index = 0;
            type();
          }, this.speed);
        }
      }
  
      this.element.textContent = '';
      type();
  
      return this;
    }
  }

  root.CType = CType
})(window)