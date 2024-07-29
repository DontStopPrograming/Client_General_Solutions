import './Contact.css';

export const Contact = () => {
    return (
        <>
            <div className='contact father'>
                <div className='container__contact'>
                    <div className='title_contact'>
                        <h2>
                            OUR <br /> HIDEAWAY <br /><br />
                        </h2 >
                    </div>

                    <div className='sub_location'> <h2> Location </h2><p> Lima, 216 - 217 bla bla bla</p> </div>
                    <div className='sub_follow'> <h2>Follow on</h2> <p> . Facebook . Instagram  </p></div>

                </div>

                <div className='container__contact__two'>
                    <div className='sub_phone'> <h2>Phone</h2> <p> +51 999 999 999 </p></div>
                    <div className='sub_email'> <h2>Email</h2> <p> hello@gmail.com </p></div>
                </div>

                <span className='footer__copy'>
                    &#169; All rights reserved {new Date().getFullYear()}
                </span>
            </div>



        </>
    )
}