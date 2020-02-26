##Emails Editor Component

A simple demo of email list editor component.

#####How to Use
Just include `email-editor.js` into your page as well as it's styles file `emails-editor.css`

Then, add following html and js code to your page:

```html
<div id="emails-editor"></div>
```
```javascript
const container = document.querySelector('#emails-editor');
const editor = new EmailsEditor.Main(container,{ sharedContentName: 'My Board ABC'});
```
`sharedContentName` is the only option to be set, it will appear in the header of the component as the name of the item to share.

You can subscribe to changes of email address list

```javascript
editor.subscribeToChanges(function(thsList){
  ...
})
```

You can set the initial list of addresses or reset to a new state:
```javascript
const addressArray = [
  new EmailsEditor.EmailAddress('aaa@aaa.com'),
  new EmailsEditor.EmailAddress('bbb@bbb.com'),
  new EmailsEditor.EmailAddress('ccc@ccc.com')
]
editor.setEmails(addressArray);
```

To add to address list do:
```javascript
editor.addEmails([new EmailsEditor.EmailAddress('aaa@aaa.com')])
```

To get current list of addresses:
```javascript
const thsList = editor.getEmails();
```
