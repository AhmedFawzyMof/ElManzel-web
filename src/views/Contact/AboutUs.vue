<template>
  <section>
    <div class="image">
      <img src="/about.jpg" />
    </div>

    <div class="content">
      <h2>About Us</h2>
      <span><!-- line here --></span>

      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
        aspernatur voluptas inventore ab voluptates nostrum minus illo laborum
        harum laudantium earum ut, temporibus fugiat sequi explicabo facilis
        unde quos corporis!
      </p>

      <ul class="links">
        <li><router-link to="/faq">FAQ</router-link></li>

        <div class="vertical-line"></div>

        <li><router-link to="/">service</router-link></li>

        <div class="vertical-line"></div>

        <li><router-link to="/contact">contact</router-link></li>
      </ul>

      <ul class="icons">
        <li>
          <a href="#"><i class="bx bxl-twitter"></i></a>
        </li>
        <li>
          <a href="#"><i class="bx bxl-facebook"></i></a>
        </li>
        <li>
          <a href="#"><i class="bx bxl-instagram-alt"></i></a>
        </li>
        <li>
          <a href="#"><i class="bx bxl-linkedin-square"></i></a>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
export default {
  name: "AboutUs",
};
</script>
<style lang="css">
.image {
  display: grid;
  place-items: center;
}
section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 90vh;
  width: 85vw;
  margin: 0 auto;
}
.content {
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.content h2 {
  text-transform: uppercase;
  font-size: 36px;
  letter-spacing: 6px;
  opacity: 0.9;
}
.content span {
  height: 0.5px;
  width: 80px;
  background: #777;
  margin: 30px 0;
}
.content p {
  padding-bottom: 15px;
  font-weight: 300;
  opacity: 0.7;
  width: 60%;
  text-align: center;
  margin: 0 auto;
  line-height: 1.7;
}
.links {
  margin: 15px 0;
}
.links li {
  border: 0.5px solid #777;
  list-style: none;
  border-radius: 5px;
  padding: 10px 15px;
  width: 160px;
  text-align: center;
  transition: 0.4s;
}
.links li a {
  text-transform: uppercase;
  color: #777;
  text-decoration: none;
  transition: 0.4s;
}
.links li:hover {
  border-color: #298bd7;
}
.links li:hover a {
  color: #298bd7;
}
.vertical-line {
  height: 30px;
  width: 0.5px;
  background: #777;
  margin: 0 auto;
}
.icons {
  display: flex;
  padding: 15px 0;
}
.icons li {
  display: block;
  padding: 5px;
  margin: 5px;
  transition: 0.4s;
}

.icons li a {
  color: #333;
}

.icons li i {
  font-size: 26px;
  opacity: 0.8;
  transition: 0.4s;
}
.icons li i:hover {
  color: #298bd7;
}

/*****************/

@media (max-width: 992px) {
  section {
    grid-template-columns: 1fr;
    width: 100%;
  }
  .image {
    height: 100vh;
  }
  .content {
    height: 100vh;
  }
  .content h2 {
    font-size: 20px;
    margin-top: 50px;
  }
  .content span {
    margin: 20px 0;
  }
  .content p {
    font-size: 14px;
  }
  .links li a {
    font-size: 14px;
  }
  .links {
    margin: 5px 0;
  }
  .links li {
    padding: 6px 10px;
  }
  .icons li i {
    font-size: 15px;
  }
}
</style>
