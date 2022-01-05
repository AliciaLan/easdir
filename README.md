#  <span style="font: 1.5em 'Forte'; color:rgb(54, 213, 251)">Easdir</span>

## Project description

EasDir (easy directory) is a directory manager. You can add directories, text files and pictures.

</br>

This project was carried out by LAN Alicia and MUSOLES Hugo as part of a study project.

</br>

---

## How to use it

**Access the application :**
- Launch two terminals at the root of the easdir project.
- Launch `ng serve` in the first one.
- Launch `json-server db.json` in the second one.
- Open a browser and go to `http://localhost:4200/`.

</br>

**Add an element :**   
To add a new directory, text file or picture, you have to click on the corresponding button and give a name to your element.  
Then you can validate or cancel its addition.  

<span style="color:red">/!\ </span> An addition does not modify the content of the text file or the url of the picture. 


</br>

**Display an element :**  
To display details of a text file or a picture, you have to click on the element you want to see. It will open a new page with all information about it.  
In this page, you can delete or edit the element.

You can see the content of a directory by cliking on it in the list page.

</br>

**Edit an element :**  
To edit a text file or a picture, you have differents solutions :
- Edit name : (*In the list page*)
  - Double-click on the element's name.
  - Type a new name.
- Edit name and content : (*In the detail page*)
  - Click on the edit button.
  - Type a new name and a new content (content can be empty). The content of a picture is an url.

To edit a directory, you can double-click on its name and write a new one.  

Then you can validate or cancel its edition. 

</br>

**Delete an element :**  
To delete an element, you have differents solutions : 
- In the list page : click on the red button under its name.
- In the detail page (except for directories) : click on the red button at the top right.

If you delete a directory, it will also delete all elements it contains.  

<span style="color:red">/!\ </span> This action is irrevocable.

</br>

**Additionnal functionnalities :**
- Color Mode (light or dark)
- Multi-language (english or french)

</br>

---

## How to install it 

To run this project, you have to install :
- nodeJS
- Angular (project generated in version 12.2.9)
- typescript
- json-server
- all local dependencie (`npm install` and `ng build`) 
