import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Person({ generate }) {

  const [inputName, setInputName] = useState('')
  const [inputAlternateName, setInputAlternateName] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [inputPicture, setInputPicture] = useState('')
  const [inputJob, setInputJob] = useState('')
  const [inputCompany, setInputCompany] = useState('')
  const [inputSameAs, setInputSameAs] = useState([''])

  const addInputSameAs = () => {
    setInputSameAs([
      ...inputSameAs,
      ''
    ])
  }

  const removeInputSameAs = (index) => {
    let newArray = [...inputSameAs]
    newArray.splice(index, 1)
    setInputSameAs(newArray)
  }

  const updateInputSameAs = (index, newValue) => {
    let newArray = [...inputSameAs]
    newArray[index] = newValue
    setInputSameAs(newArray)
  }

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = "Person"
    output['name'] = inputName
    if(inputAlternateName){
      output['alternateName'] = inputAlternateName
    }
    output['url'] = inputUrl
    output['image'] = inputPicture
    if(inputJob){
      output['jobTitle'] = inputJob
    }
    if(inputCompany){
      output['worksFor'] = {
        "@type": "Organization",
        "name": inputCompany
      }
    }
    let sameAs = [...inputSameAs.filter(i => i)]
    if(sameAs){
      output['sameAs'] = []
      output['sameAs'].push(...sameAs)
    }
    return output
  }

  const generateMicrodata = () => {
    let output = `<span itemscope itemtype="http://schema.org/Person">
  <meta itemprop="name" content="` + inputName + `"/>\r\n`;
    if(inputAlternateName){
      output += `  <meta itemprop="alternateName" content="` + inputAlternateName + `"/>\r\n`
    }
    output += `<link itemprop="url" href="` + inputUrl + `"/>
  <img itemprop="image" src="` + inputPicture + `"/>\r\n`
    if(inputJob){
      output += `  <meta itemprop="jobTitle" content="` + inputJob + `"/>\r\n`
    }
    if(inputCompany){
      output += `<span itemprop="worksFor" itemscope itemtype="http://schema.org/Organization">
    <meta itemprop="name" content="` + inputCompany + `""/>
  </span>\r\n`
    }
    inputSameAs.filter(i => i).forEach(item => {
      output += `  <a itemprop="sameAs" href="` + item + `">` + item + `</a>\r\n`
    })
    output += `</span>`
    return output
  }

  useEffect(() => {
    generate(generateJson(), generateMicrodata());
  });

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputName">Imię i nazwisko</label>
          <input type="text" id="inputName" value={inputName} onChange={e => setInputName(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputAlternateName">Alternatywna nazwa</label>
          <input type="text" id="inputAlternateName" value={inputAlternateName} onChange={e => setInputAlternateName(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputUrl">Adres URL</label>
          <input type="url" id="inputUrl" value={inputUrl} onChange={e => setInputUrl(e.target.value)}></input>
          {inputUrl && !validURL(inputUrl) && <span className={styles.textDanger}>Adres URL jest niepoprawny</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputPicture">Adres URL zdjęcia</label>
          <input type="url" id="inputPicture" value={inputPicture} onChange={e => setInputPicture(e.target.value)}></input>
          {inputPicture && !validURL(inputPicture) && <span className={styles.textDanger}>Adres URL jest niepoprawny</span>}
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label htmlFor="inputJob">Nazwa stanowiska</label>
          <input type="text" id="inputJob" value={inputJob} onChange={e => setInputJob(e.target.value)}></input>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="inputCompany">Nazwa firmy</label>
          <input type="text" id="inputCompany" value={inputCompany} onChange={e => setInputCompany(e.target.value)}></input>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.formGroup}>
          <label>Linki do social media</label>
          {inputSameAs.map((value, index) => {
            return <div className={styles.formGroup} key={index}>
              <div className={styles.gridNoWrap}>
                <input type="url" value={value} onChange={e => updateInputSameAs(index, e.target.value)}></input>
                <button className={styles.btn} onClick={() => removeInputSameAs(index)}>Usuń</button>
              </div>
              {value && !validURL(value) && <p className={styles.textDanger}>Adres URL jest niepoprawny</p>}
            </div>
          })}
          <button className={styles.btn} onClick={() => addInputSameAs()}>Dodaj pozycję</button>
        </div>
      </div>
    </>
  )
}
