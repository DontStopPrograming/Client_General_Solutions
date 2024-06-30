// // GSAP
// import { gsap } from 'gsap'

// // Hook
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useRef, useEffect } from 'react'

// export const Animation = () => {
//     const location = useLocation()
//     const navigation = useNavigate()
//     const transitionRef = useRef(null)

//     useEffect(() => {
//         const handleTransition = () => {
//             const tl = gsap.timeline({
//                 onStart: () => {
//                     transitionRef.current.style.display = 'block'
//                 },
//                 onComplete: () => {
//                     transitionRef.current.style.display = 'none'
//                 }
//             })

//             tl.to(transitionRef.current, {
//                 duration: 0.5,
//                 backgroundColor: '#ff0000',
//                 ease: 'power2.inOut',
//             }).to(
//                 transitionRef.current,
//                 {
//                     duration: 0.5,
//                     backgroundColor: 'transparent',
//                     ease: 'power2.inOut',
//                 },
//                 '+=0.25'
//             )
//         }

//         const unlisten = navigation.listen((location, action) => {
//             if (action === 'PUSH' && location.pathname === '/services') {
//                 handleTransition()
//             }
//         })

//         return () => {
//             unlisten()
//         }
//     }, [navigation, location.pathname])


//     return (
//         <div
//             ref={transitionRef}
//             style={{
//                 position: 'fixed',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 height: '100%',
//                 backgroundColor: 'transparent',
//                 zIndex: 9999,
//                 display: 'none',
//             }}
//         />
//     )
// }