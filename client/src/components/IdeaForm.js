import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.getElementById('form-modal');
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
      this._form.addEventListener('submit', this.onSubmit.bind(this));
  }

  async onSubmit(e) {
    e.preventDefault();

    let textValue = this._form.elements.text.value;
    let tagValue = this._form.elements.tag.value;
    let usernameValue = this._form.elements.username.value;

    if (!textValue || !tagValue || !usernameValue) {
      alert('Please enter all fields');
      return;
    }

    // Save user to local storage
    localStorage.setItem('username', usernameValue);
    
    const idea = {
      text: textValue,
      tag: tagValue,
      username: usernameValue
    };

    try {
      // Add idea to server
      const newIdea = await IdeasApi.createIdea(idea);

      // Add idea to list
      this._ideaList.addIdeaToList(newIdea.data.data);
    } catch (error) {
      console.log(error);
    }
    
    // Clear fields
    textValue = '';
    tagValue = '';
    usernameValue = '';

    this.render();

    // Close modal
    document.dispatchEvent(new Event('closemodal'));
  }
  
  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
      <div class="form-control">
        <label for="idea-text">Enter a Username</label>
        <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : ''}"/>
      </div>
      <div class="form-control">
        <label for="idea-text">What's Your Idea?</label>
        <textarea name="text" id="idea-text"></textarea>
      </div>
      <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
      </div>
      <button class="btn" type="submit" id="submit">Submit</button>
    </form>`
        
    this._form = document.getElementById('idea-form');
    this.addEventListeners();
  }
}

export default IdeaForm;