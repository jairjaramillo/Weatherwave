/*! *****************************************************************************
MIT License

Copyright (c) 2020 Jair Jaramillo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
******************************************************************************* */

/* eslint-disable max-len */

/**
 * Creates an HTML element and appends it to another HTML element.
 * @param {HTMLElement} appendTo HTML element where the create function witll append to. Use NULL to avoid this.
 * @param {String} className (Optional) The class or classes the element will have.
 * @param {String} idName (Optional) The ID tag of the element.
 * @param {String} elementType (Optional) The type of the element it will be created. <div> by default.
 */
export default function create(appendTo, className = '', idName = '', elementType = 'div') {
  const element = document.createElement(elementType);
  if (className !== '') element.className = className;
  if (idName !== '') element.id = idName;
  if (appendTo != null) appendTo.appendChild(element);
  return element;
}
