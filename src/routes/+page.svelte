
<div class="homepage_container">

    <div class="banner">
        <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600" alt="baner fertris">
        <div class="banner_text">
            <h1>Welcome to [name]</h1>
            <p>powered by BrownBird Organization</p>
        </div>
    </div>

    <div class="login">
        <h2>Are you ready?</h2>
        <p>-login to participate in tournament-</p>
        <a href="/login" class="login_button">Log in</a>
    </div>

</div>


<style>

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
        height: 300px;
        width: 80%;
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

</style>