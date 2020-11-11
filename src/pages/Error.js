import React from 'react'
import { Link } from 'react-router-dom'
import Banner from '../components/Banner'
import Hero from '../components/Hero'

const Error = () => {
    return (
        <div>
            <Hero>
                <Banner title='404' subtitle='page not found'>
                    <Link className='btn-primary' to='/'>
                        return home
                    </Link>
                </Banner>
            </Hero>
        </div>
    )
}

export default Error;