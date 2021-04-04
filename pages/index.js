import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react"

export default function Home() {

  const [selectType, setSelectType] = useState('person')
  const [inputName, setInputName] = useState('Kamil')
  const [inputAlternateName, setInputAlternateName] = useState('Kamil 2')
  const [inputUrl, setInputUrl] = useState('https://wyremski.pl')
  const [inputPicture, setInputPicture] = useState('to jest logo')
  const [inputJob, setInputJob] = useState('FULL Stack')
  const [inputCompany, setInputCompany] = useState('KWX')

  const [generatorOutputJson, setGeneratorOutputJson] = useState('')
  const [generatorOutputMicrodata, setGeneratorOutputMicrodata] = useState('')
  const [outputTab, setOutputTab] = useState('json')

  const generateJsonPerson = () => {
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
    return output
  }

  const generateMicrodataPerson = () => {
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
    output += `</span>`
    return output
  }

  useEffect(() => {
    let outputObjJson = {}
    let outputMicrodata = ''

    switch(selectType){
      case "person":
        outputObjJson = generateJsonPerson()
        outputMicrodata = generateMicrodataPerson()
        break;
    }

    setGeneratorOutputJson('<script type="application/ld+json">\r\n' + JSON.stringify(outputObjJson, null, 4) + '\r\n</script>')
    setGeneratorOutputMicrodata(outputMicrodata)
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Microdata online generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Microdata online generator</h1>
        
        <div className={styles.grid}>
          <div className={styles.generatorSource}>
            <div className={styles.formGroup}>
              <label for="selectType">Wybierz rodzaj znaczników <a href="https://schema.org" target="_blank" rel="noopener noreferrer" title="Schema">Schema.org</a></label>
              <select id="selectType" value={selectType} onChange={e => setSelectType(e.target.value)}>
                <option value="person">Person</option>
                <option value="product">Product</option>
              </select>
            </div>
            {selectType=="person" &&
              <>
                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label for="inputName">Imię i nazwisko</label>
                    <input type="text" id="inputName" value={inputName} onChange={e => setInputName(e.target.value)}></input>
                  </div>
                  <div className={styles.formGroup}>
                    <label for="inputAlternateName">Alternatywna nazwa</label>
                    <input type="text" id="inputAlternateName" value={inputAlternateName} onChange={e => setInputAlternateName(e.target.value)}></input>
                  </div>
                </div>
                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label for="inputUrl">Adres URL</label>
                    <input type="text" id="inputUrl" value={inputUrl} onChange={e => setInputUrl(e.target.value)}></input>
                  </div>
                  <div className={styles.formGroup}>
                    <label for="inputPicture">Adres URL zdjęcia</label>
                    <input type="text" id="inputPicture" value={inputPicture} onChange={e => setInputPicture(e.target.value)}></input>
                  </div>
                </div>
                <div className={styles.grid}>
                  <div className={styles.formGroup}>
                    <label for="inputJob">Nazwa stanowiska</label>
                    <input type="text" id="inputJob" value={inputJob} onChange={e => setInputJob(e.target.value)}></input>
                  </div>
                  <div className={styles.formGroup}>
                    <label for="inputCompany">Nazwa firmy</label>
                    <input type="text" id="inputCompany" value={inputCompany} onChange={e => setInputCompany(e.target.value)}></input>
                  </div>
                </div>
              </>
            }
          </div>
          <div className={styles.generatorTarget}>
            <nav className={styles.navTab}>
              <button onClick={() => setOutputTab('json')} className={`${styles.btn} ${outputTab == 'json' ? styles.btnActive : ''}`}>JSON-LD</button>
              <button onClick={() => setOutputTab('microdata')} className={`${styles.btn} ${outputTab == 'microdata' ? styles.btnActive : ''}`}>Microdata</button>
            </nav>
            {outputTab == 'json' &&
              <textarea value={generatorOutputJson}></textarea>
            }
            {outputTab == 'microdata' &&
              <textarea value={generatorOutputMicrodata}></textarea>
            }
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://wyremski.pl" target="_blank" rel="noopener noreferrer" title="Full Stack Web Developer"
        >Created by Kamil Wyremski</a>
      </footer>
    </div>
  )
}
