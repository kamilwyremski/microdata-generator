import { useState, useEffect } from "react"
import styles from '../../styles/Home.module.css'
import validURL from '../validURL'

export default function Organization({ generate }) {

  const [inputType, setInputType] = useState('')
  const types = [
    'Airline',
    'Consortium',
    'Corporation',
    'EducationalOrganization',
    'FundingScheme',
    'GovernmentOrganization',
    'LibrarySystem',
    'LocalBusiness',
    'MedicalOrganization',
    'NGO',
    'NewsMediaOrganization',
    'PerformingGroup',
    'Project',
    'ResearchOrganization',
    'SportsOrganization',
    'WorkersUnion'
  ]
  const [inputName, setInputName] = useState('')
  const [inputAlternateName, setInputAlternateName] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [inputPicture, setInputPicture] = useState('')

  const generateJson = () => {
    let output = {}
    output['@context'] = "https://schema.org/"
    output['@type'] = inputType || 'Organization'
    output['name'] = inputName
    if(inputAlternateName){
      output['alternateName'] = inputAlternateName
    }
    output['url'] = inputUrl
    output['image'] = inputPicture
    return output
  }

  const generateMicrodata = () => {
    let output = `<span itemscope itemtype="http://schema.org/${inputType || 'Organization'}">
    <meta itemprop="name" content="` + inputName + `"/>\r\n`;
    if(inputAlternateName){
      output += `  <meta itemprop="alternateName" content="` + inputAlternateName + `"/>\r\n`
    }
    output += `<link itemprop="url" href="` + inputUrl + `"/>
  <img itemprop="image" src="` + inputPicture + `"/>\r\n`
    output += `</span>`
    return output
  }

  useEffect(() => {
    generate(generateJson(), generateMicrodata());
  });

  return (
    <>
      <div className={styles.formGroup}>
        <label htmlFor="inputType">Typ</label>
        <select id="inputType" value={inputType} onChange={e => setInputType(e.target.value)}>
          <option value="">-- wybierz typ --</option>
          {types.map(type => {
            return (
              <option>{type}</option>
            );
          })}
        </select>
      </div>
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
    </>
  )
}
