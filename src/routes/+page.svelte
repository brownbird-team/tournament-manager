<script lang="ts">
    import logo from '#lib/assets/logo.png'
    import type { PageProps } from './$types';

    const { data }: PageProps = $props();
</script>

<!--
<div class="homepage_container">

    <div class="banner">
        <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600" alt="baner fertris">
        <div class="banner_text">
            <h1>Welcome to Tournament Manager</h1>
            <p>powered by BrownBird Team</p>
        </div>
    </div>

    <div class="login">
        <h2>Are you ready?</h2>
        <p>-login to participate in tournament-</p>
        <a href="/login" class="login_button">Log in</a>
    </div>

</div>
-->

<div class="front-page-container">
    <img src={logo} alt="Logo">
    <h2>{data.appName}</h2>
    <a class="login-button" href="/login">Login</a>
</div>

<style>
    /*
    .homepage_container{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10%;
        margin-right: 10%;
        gap: 30px;
        margin-top: 25px;
        margin-bottom: 5%;
    }

    .banner{
        position: relative;
        height: 350px;
        width: 100%;
        overflow: hidden;
        border-radius: 10px;
    }
    .banner img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(50%);
    }
    .banner_text{
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        color: white;
        font-weight: bolder;
        transform: translate(-50%, -50%);
        background-color: transparent;
        width: 90%;
    }

    .login{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 10px;
    }
    .login h2,
    .login p{
        margin: 0;
    }
    .login h2{
        margin-top: 10px;
    }
    .login_button{
        background-color: rgb(251, 150, 88);
        color: white;
        text-decoration: none;
        padding: 12px 35px;
        border-radius: 8px;
        font-weight: bolder;
        margin-top: 10px;
    }
    .login_button:hover{
        background-color: rgb(176, 106, 62);
    }

    @media (max-width: 600px){
        .homepage_container{
            margin-left: 4%;
            margin-right: 4%;
            gap: 20px;
        }
        .banner{
            width: 99%;
            height: 200px;
        }
        .banner_text {
            width: 90%;
        }
        .banner_text h1{
            font-size: 25px;
        }
        .banner_text p{
            font-size: 15px;
        }
        .login h2{
            font-size: 21px;
        }
        .login p{
            font-size: 15px;
        }
        .login_button{
            padding: 12px 40px;
        }
    }
    */

    .front-page-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 1rem;
    }

    .front-page-container img {
        height: 15rem;
    }

    .front-page-container h2 {
        font-size: 2rem;
    }

    .login-button {
        width: min(100%, 10rem);
        background-color: var(--color-framebg);
        padding: 1rem;
        text-align: center;
        text-decoration: none;
        color: var(--color-text);
        border-radius: 0.5rem;
        border: 1px solid var(--color-border);
    }
</style>