import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/Home.css'

const Home = () => {
    return (
        <div className='home'>
            <div className='home__main'>
                <div className="home__content">
                    <h2>TITULO CONTENIDO PRINCIPAL</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit veritatis fugit illum ipsam fugiat autem quasi
                        aperiam cum. In temporibus amet eos inventore ipsum
                        beatae, totam nulla unde labore repellendus architecto
                        laboriosam asperiores optio eligendi provident quod
                        quia quis itaque. Itaque quasi modi quis corrupti doloribus
                        aperiam, debitis veniam delectus.
                    </p>
                </div>
                <div className="home__links">
                    <ul>
                        <Link to={'/about'}>
                            <li>
                                <h3>about</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                                    . Nesciunt corrupti, et similique magnam illo officiis
                                    repellendus mollitia explicabo placeat quam.
                                </p>
                            </li>
                        </Link>
                        <Link to={'/admin'}>
                            <li>
                                <h3>admin</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Nesciunt corrupti, et similique magnam illo officiis
                                    repellendus mollitia explicabo placeat quam.
                                </p>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
            <aside className="home__aside">
                <h3>TITULO SUPER DINAMICO</h3>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae magnam a
                    cupiditate blanditiis, perspiciatis alias ex, voluptatum provident eum totam
                    necessitatibus modi inventore? Est id quisquam consequatur similique eveniet
                    non debitis illo repudiandae perferendis. Sunt, porro quidem iste impedit
                    nemo cumque soluta repellat odio incidunt quis eum maiores quo molestias fuga
                    quaerat mollitia velit facilis ratione? Ea quam blanditiis corporis eveniet
                    eum mollitia numquam velit facere perspiciatis accusamus veniam ut, neque
                    , cumque, laborum maxime repudiandae laboriosam repellendus aperiam sint
                    possimus aliquid quaerat sed. Ipsum quod, dolorum rem cupiditate magni
                    voluptas praesentium voluptate harum quo impedit numquam. Corrupti
                    molestias soluta ducimus!
                </p>
            </aside>
        </div>
    )
}

export default Home