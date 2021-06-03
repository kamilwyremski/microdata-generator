import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Breadcrumbs({ generate }) {

  const oneUrl = {
    'url': '',
    'name': '',
    'image': ''
  }

  const [inputUrls, setInputUrls] = useState([oneUrl])

  const addInputUrl = () => {
    setInputUrls([
      ...inputUrls,
      oneUrl
    ])
  }

  const removeInputUrl = (index) => {
    let newArray = [...inputUrls]
    newArray.splice(index, 1)
    setInputUrls(newArray)
  }

  const updateInputUrlUrl = (index, newValue) => {
    let newArray = [...inputUrls]
    newArray[index]['url'] = newValue
    setInputUrls(newArray)
  }

  const updateInputUrlName = (index, newValue) => {
    let newArray = [...inputUrls]
    newArray[index]['name'] = newValue
    setInputUrls(newArray)
  }

  const updateInputUrlImage = (index, newValue) => {
    let newArray = [...inputUrls]
    newArray[index]['image'] = newValue
    setInputUrls(newArray)
  }

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = "BreadcrumbList"
    let urls = [...inputUrls.filter(item => item.url)]
    if(urls){
      output['itemListElement'] = []
      urls.forEach((url, index) => {
        let item = {
          "@type": "ListItem",
          "position": index+1,
          "item": {
            "@id": url.url,
            "name": url.name
          }
        }
        if(url.image){
          item.item.image = url.image
        }
        output['itemListElement'].push(item)
      })
    }
    return output
  }

  const generateMicrodata = () => {
    let output = `<ol itemscope itemtype="http://schema.org/BreadcrumbList">\r\n`;
    inputUrls.filter(item => item.url).forEach((url, index) => {
      output += `  <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
    <meta itemprop="position" content="` + (index+1) + `"/>
    <a itemprop="item" href="` + url.url + `">
      <span itemprop="name">` + url.name + `</span>
    </a>
  </li>\r\n`
    })
    output += `</ol>`
    return output
  }

  useEffect(() => {
    generate(generateJson(), generateMicrodata());
  });

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          {inputUrls.map((inputUrl, index) => {
            return <div key={index}>
              <label>Adres URL {index+1}</label>
              <div className={styles.formGroup} >
                <input type="url" value={inputUrl.url} onChange={e => updateInputUrlUrl(index, e.target.value)} placeholder="Adres URL"></input>
                {inputUrl.url && !validURL(inputUrl.url) && <p className={styles.textDanger}>Adres URL jest niepoprawny</p>}
              </div>
              <div className={styles.formGroup}>
                <div className={styles.gridNoWrap}>
                  <input type="text" value={inputUrl.name} onChange={e => updateInputUrlName(index, e.target.value)} placeholder="Nazwa strony"></input>
                  <input type="url" value={inputUrl.image} onChange={e => updateInputUrlImage(index, e.target.value)} placeholder="Adres URL obrazka"></input>
                  {index>0 &&
                    <button className={styles.btn} onClick={() => removeInputUrl(index)}>Usuń</button>
                  }
                </div>
                {inputUrl.image && !validURL(inputUrl.image) && <p className={styles.textDanger}>Adres URL obrazka jest niepoprawny</p>}
              </div>
            </div>
          })}
          <button className={styles.btn} onClick={() => addInputUrl()}>Dodaj adres URL</button>
        </div>
      </div>
    </>
  )
}
