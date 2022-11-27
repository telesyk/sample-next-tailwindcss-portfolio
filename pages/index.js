import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { FaMoon, FaSun, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa'
import { isObjEmpty } from '../helpers'
import avatar from '../public/assets/avatar-2.jpg'
import code from '../public/assets/code.jpg'
import design from '../public/assets/design.jpg'
import consulting from '../public/assets/consulting.jpg'
import portfolio1 from '../public/assets/portfolio-1.jpg'
import portfolio2 from '../public/assets/portfolio-2.jpg'
import portfolio3 from '../public/assets/portfolio-3.jpg'

const DATA_JSON_PATH = './data.json'
const SERVICE_IMG_URLS=[design, code, consulting]
const PORTFOLIO_IMG_URLS=[portfolio1, portfolio2, portfolio3]

export default function Home() {
  const [data, setData] = useState({})
  const [darkMode, setDarkMode] = useState(false)

  useEffect(
    () => {
      fetch(DATA_JSON_PATH)
        .then(res => res.json())
        .then(data => setData(data))
    }, []
  )

  const handleDarkMode = () => setDarkMode(!darkMode)

  return (
    <div>
      <Head>
        <title>Portfolio sample with Next.js and TailwindCSS</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={darkMode ? 'dark app' : 'app'}>
        {isObjEmpty(data) && (
          <section className='app-section'>
            <p className='text-lg font-black dark:text-white'>No profile data</p>
          </section>
        )}
        {!isObjEmpty(data) && (
          <>
            <nav className='app-header'>
              <h1 className='app-header__name'>{data.navigation.brandName}</h1>
              <ul className='app-header__nav'>
                <li className='app-header__nav-item' onClick={handleDarkMode}>
                  {!darkMode ? <FaMoon className='app-header__nav-icon' /> : <FaSun className='app-header__nav-icon' />}
                </li>
                <li className='app-header__nav-item'>
                  <a href='#' className='app-header__nav-link'>{data.navigation.linkName}</a>
                </li>
              </ul>
            </nav>
            <section className='app-section'>
              <div className='app-main'>
                <div className='app-main__content'>
                  <h1 className='app-main__title'>{data.main.title}</h1>
                  <h2 className='app-main__subtitle'>{data.main.subtitle}</h2>
                  <p className='app-main__description'>{data.main.description}</p>
                </div>
                <div className='app-main__socials'>
                  <FaLinkedin />
                  <FaInstagram />
                  <FaYoutube />
                </div>
                <div className='app-main__image'>
                  <Image src={avatar} alt='avatar' fill='true' objectFit='cover' />
                </div>
              </div>
            </section>
            <section className='app-section'>
              <div className='app-services'>
                <div className='app-services__content'>
                  <h2 className='app-services__title'>{data.services.title}</h2>
                  <p className='app-services__description'>{data.services.description}</p>
                  <p className='app-services__description'>{data.services.description2}</p>
                </div>
                <div className='app-services__list'>
                  {data.services.items.map((service, idx) => (
                  <div className='app-services__item' key={idx}>
                    <Image className='app-services__item-image' src={SERVICE_IMG_URLS[idx]} alt='service' width='200' height='200' />
                    <h3 className='app-services__item-title'>{service.title}</h3>
                    <p className='app-services__item-description'>{service.description}</p>
                    <p className='app-services__item-tags'>
                      {service.tags.map((tag, index) => <span key={index} className="app-services__item-tag">{tag}</span>)}
                    </p>
                  </div>
                  ))}
                </div>
              </div>
            </section>
            <section className='app-section'>
              <div className='app-portfolio'>
                <div className='app-portfolio__content'>
                  <h2 className='app-portfolio__title'>{data.portfolio.title}</h2>
                  <p className='app-portfolio__description'>{data.portfolio.description}</p>
                </div>
                <div className='app-portfolio__list'>
                {PORTFOLIO_IMG_URLS.map((item, idx) => (
                  <div className='app-portfolio__item' key={idx}>
                    <Image className='app-portfolio__item-image' src={item} alt='portfolio' width='200' height='200' />
                  </div>
                  ))}
                </div>
              </div>
            </section>
            <footer className='app-footer'>
              <p className='app-footer__text'>Copyright c 2022</p>
              <p className='app-footer__text'>Images useg from <a className='text-underline' href='https://unsplash.com/'>Unsplash</a></p>
            </footer>
          </>
        )}
      </main>
    </div>
  )
}
