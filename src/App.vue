<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --color-primary:#5969fd;
  --color-danger:#f01b2d;
  --color-success: #2af3b0;
  --color-warning: #feb039;
  --color-white: #fff;
  --color-info-dark: #7d8da1;
  --color-info-light: #dce1eb;
  --color-dark: #363949;
  /*--color-light: rgba(132, 139, 200, 0.18);*/
  --color-light: #9094ce39;
  --color-primary-variant: #111e88;
  --color-dark-variant:    #677483;
  --color-background: #f6f6f9;
  --color-1: linear-gradient(90deg, rgba(236,33,19,1) 0%, rgba(242,112,53,1) 40%, rgba(255,218,0,1) 100%);

  --card-border-radius: 2rem;
  --border-radius-1: 0.4rem;
  --border-radius-2: 0.8rem;
  --border-radius-3: 1.2rem;

  --card-padding: 1.8rem;
  --padding-1: 1.2rem;
   --box-shadow: 0 2rem 3rem var(--color-light);


  --bs-border-radius:0.375rem;
   --bs-border-color:#dee2e6;
   --bs-border-width:1px;
   --bs-body-bg:#fff;
   --bs-body-color:#212529;
   --bs-secondary-color:rgba(33, 37, 41, 0.75);
   --bs-secondary-bg:#e9ecef;
}

/*=========DARK THEME VARAIBLES=============0*/
.dark-theme-variables{
  --color-background:#181a1e;
  --color-white:#202528;
  --color-dark:#edeffd;
  --color-dark-variant:#a3bdcc;
  --color-light: rgba(0, 0, 0, 0.4);
  --box-shadow: 0 2rem 3rem var(--color-light);
}

* {
    margin: 0;
    padding: 0;
    outline: 0;
    appearance: 0;
    border: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
  }
  
html{
    font-size: 14px;
}

body {
    width: 100vw;
    height: 100vh;
    font-family: poppins, sans-serif;
    font-size: 0.88rem;
    background: var(--color-background);
    user-select: none;
    overflow-x: hidden;
    color: var(--color-info);
}

.app{
  background: var(--color-background);
}


a {
  color: var(--color-dark);
}

img {
  display: block;
  width: 100%;
}

h1{
  font-weight: 800;
  font-size: 1.8rem;
}

h2{
  font-size: 1.4rem;
}

h3{
  font-size: 0.87rem;
}

h4{
  font-size: 0.8rem;
}

h5 {
  font-size: 0.77rem;
}

small {
  font-size: 0.75rem; 
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0.5rem;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: 0.5rem;
}

.text-muted{
  color: var(--color-info-dark)
}

b {
  color: var(--color-dark);
}

.primary {
  color: var(--color-primary);
}

.danger {
  color: var(--color-danger);
}

.success {
  color: var(--color-success);
}

.warning {
  color: var(--color-warning);
}
.bold{
  font-weight: bold;
}
</style>