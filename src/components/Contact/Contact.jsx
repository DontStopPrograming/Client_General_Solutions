import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';
import { gsap } from 'gsap';

export const Contact = () => {
    const [showMap, setShowMap] = useState(false);
    const lineRef = useRef(null);
    const modalRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (showMap) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const lineRect = lineRef.current.getBoundingClientRect();
            gsap.to(lineRef.current, { height: '4px', duration: 0.5 });
            gsap.set(modalRef.current, {
                height: 0,
                opacity: 0,
                top: lineRect.bottom - containerRect.top,
                left: lineRect.left - containerRect.left,
                width: lineRect.width,
            });
            gsap.to(modalRef.current, {
                height: '450px',
                opacity: 1,
                duration: 1,
                delay: 0.5,
                ease: 'power2.out'
            });
        } else {
            gsap.to(lineRef.current, { height: '0px', duration: 0.5 });
            gsap.to(modalRef.current, { height: '0px', opacity: 0, duration: 1 });
        }
    }, [showMap]);

    const handleClick = (area) => {
        setShowMap(area === 'location');
    };

    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowMap(false);
        }
    };

    return (
        <div className='contact father' onClick={handleCloseModal} ref={containerRef}>
            <div className='container__contact'>
                <div className='title_contact'>
                    <h2>
                        OUR <br /> HIDEAWAY <br /><br />
                    </h2>
                </div>

                <div className='sub_location' onClick={(e) => { e.stopPropagation(); handleClick('location'); }}>
                    <h2>Location</h2>
                    <p>Lima, 216 - 217 bla bla bla</p>
                    <div className='static_line'></div>
                    <div ref={lineRef} className='animated_line'></div>
                </div>
                <div className='sub_follow' onClick={(e) => { e.stopPropagation(); handleClick('follow'); }}>
                    <h2>Follow on</h2>
                    <p>. Facebook . Instagram</p>
                </div>
            </div>

            <div className={`modal ${showMap ? 'active' : ''}`} ref={modalRef}>
                <div className='modal_content'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.3145220297954!2d-122.08424968468832!3d37.42206597982747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5d8a4c7f97f%3A0x7d0a86e8e6e39e39!2sGoogleplex!5e0!3m2!1sen!2sus!4v1605995512073!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Maps"
                    ></iframe>
                </div>
            </div>

            <div className='container__contact__two'>
                <div className='sub_phone'>
                    <h2>Phone</h2>
                    <p>+51 999 999 999</p>
                </div>
                <div className='sub_email'>
                    <h2>Email</h2>
                    <p>hello@gmail.com</p>
                </div>
            </div>

            <span className='footer__copy'>
                &#169; All rights reserved {new Date().getFullYear()}
            </span>
        </div>
    );
};
