<template>
  <main>
    <h1>Berekenen accessoires</h1>
    <form @submit.prevent="submitForm">
      <div class="question">
        <h2>Aantal palen</h2>
        <input min="1" max="20" type="number" v-model="input.palen" placeholder="Vul hier in..." required />
      </div>
      <div class="question">
        <h2>Afmetingen</h2>
        <h3>Lengte</h3>
        <input min="1" max="20" type="number" step="0.01" v-model="input.length" placeholder="In meters..." required />
        <h3>Breedte</h3>
        <input min="1" max="20" type="number" step="0.01" v-model="input.width" placeholder="In meters..." required />
      </div>
      <div class="question">
        <h2>Dakvorm</h2>
        <input type="radio" id="Zadeldak" value="gableRoof" v-model="input.roofShape" name="roof" checked />
        <label for="Zadeldak">Zadel</label>
        <input type="radio" id="Platdak" value="flatRoof" v-model="input.roofShape" name="roof" />
        <label for="Platdak">Plat</label>
      </div>
      <div class="question">
        <h2>Welke accessoires toevoegen?</h2>
        <div class="checkoptions">
          <div class="check">
            <input type="checkbox" id="poeren" value="poeren" v-model="checked.poeren" />
            <label for="poeren">Poeren</label>
          </div>
          <div class="check">
            <input type="checkbox" id="fundering" value="fundering" v-model="checked.fundering" />
            <label for="fundering">Fundering</label>
          </div>
          <div class="check">
            <input type="checkbox" id="beits" value="beits" v-model="checked.beits" />
            <label for="beits">Beits</label>
          </div>
          <div class="check">
            <input type="checkbox" id="dakafwerking" value="dakafwerking" v-model="checked.dakafwerking" />
            <label for="dakafwerking">Dakafwerking</label>
          </div>
          <div class="check">
            <input type="checkbox" id="shingles" value="shingles" v-model="checked.shingles" />
            <label for="shingles">Shingles</label>
          </div>
          <div class="check">
            <input type="checkbox" id="dakgootsets" value="dakgootsets" v-model="checked.dakgootsets" />
            <label for="dakgootsets">Dakgootsets</label>
          </div>
          <div class="check">
            <input type="checkbox" id="dakdoorvoer" value="dakdoorvoer" v-model="checked.dakdoorvoer" />
            <label for="dakdoorvoer">Dakdoorvoer</label>
          </div>
          <div class="check">
            <input type="checkbox" id="TTE" value="TTE" v-model="checked.TTE" /> <label for="TTE">TTE fundering</label>
          </div>
          <div class="check">
            <input type="checkbox" id="extra" value="extra" v-model="checked.extra" /> <label for="extra">Extra</label>
          </div>
          <div class="check">
            <input type="checkbox" id="verlichting" value="verlichting" v-model="checked.verlichting" />
            <label for="verlichting">Verlichting</label>
          </div>
          <div class="check">
            <input type="checkbox" id="vloeren" value="vloeren" v-model="checked.vloeren" />
            <label for="vloeren">Vloeren</label>
          </div>
          <div class="check">
            <input type="checkbox" id="opberging" value="opberging" v-model="checked.opberging" />
            <label for="opberging">Opberging</label>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="submit">Berekenen</button>
        <button @click.prevent="reset">
          <img src=".//assets/update-arrow.png" alt="" />
        </button>
      </div>
    </form>
    <div class="answer" v-if="submitted">
      <p>{{ input.palen }} palen</p>
      <p>Lengte {{ input.length }}m</p>
      <p>Breedte {{ input.width }}m</p>
      <p>Dakvorm {{ input.roofShape }}</p>
      <p>Oppervlakte {{ input.surface }} m2</p>
      <p>Omtrek {{ input.circumference }} m1</p>
      <hr />
      {{ accessoires }}
    </div>
  </main>
</template>

<script setup>
  import { ref, reactive } from "vue";

  const input = reactive({
    palen: "",
    length: "",
    width: "",
    roofShape: "",
    surface: "",
    circumference: "",
  });

  const submitted = ref(false);

  const submitForm = () => {
    accessoires.value = "";
    submitted.value = true;
    input.surface = input.width * input.length;
    input.circumference = input.width * 2 + input.length * 2;
    calculateAccessoires();
  };

  const reset = () => {
    input.palen = "";
    input.length = "";
    input.width = "";
    input.roofShape = "gableRoof";
    submitted.value = false;
  };

  const checked = reactive({
    poeren: true,
    fundering: true,
    beits: true,
    dakafwerking: true,
    shingles: true,
    dakgootsets: true,
    dakdoorvoer: true,
    TTE: true,
    shingles: true,
    extra: true,
    verlichting: true,
    vloeren: true,
    opberging: true,
  });
  const accessoires = ref("");

  const checkAddComma = () => {
    if (accessoires.value != "") {
      accessoires.value = accessoires.value + ", ";
    }
  };

  const calculateAccessoires = () => {
    if (checked.poeren) {
      accessoires.value =
        "16-185-0049-0:" +
        input.palen +
        ", 16-185-0045-0:" +
        input.palen +
        ", 21-168-0009-0:" +
        input.palen +
        ", 12-169-0004-0:" +
        input.palen;
    }
    if (checked.fundering) {
      checkAddComma();
      let sequence = Math.ceil(input.circumference / 3);
      accessoires.value =
        accessoires.value +
        "12-168-0007-0:" +
        sequence +
        ", 12-168-0007-0:" +
        sequence +
        ", 17-111-0092-0:" +
        sequence +
        ", 16-111-0078-0:" +
        sequence +
        ", 08-002-0123-0:" +
        sequence;
    }
    if (checked.beits) {
      checkAddComma();
      accessoires.value = accessoires.value + "04-020-0000-0:1";
    }
    if (checked.dakafwerking) {
      checkAddComma();
      let sequence = Math.ceil(input.circumference / 2.5);
      accessoires.value =
        accessoires.value +
        "21-260-0886-0:4, 21-260-0885-0:4, " +
        "12-115-0011-0:" +
        sequence +
        ", 11-115-0011-0:" +
        sequence;
    }
  };
</script>

<style scoped>
  main {
    margin: 2rem;
  }
  .question {
    background: #fff;
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .question:first-of-type {
    margin-top: 2rem;
  }

  h2 {
    border-bottom: 1px solid rgb(207, 207, 207);
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0.5rem 0;
  }

  h3:first-of-type {
    margin: 0 0 0.5rem 0;
  }

  input[type="number"] {
    width: 100%;
    border: 1px solid rgb(207, 207, 207);
    padding: 0.2rem;
    border-radius: 0.2rem;
  }

  label {
    margin: 0 0.5rem 0 0.2rem;
  }

  .buttons {
    display: flex;
  }

  button {
    color: #000;
    background: white;
    border: 1px solid #429e52;
    padding: 0.5rem 1rem;
    height: 32.5px;
    margin-right: 1rem;
  }

  button:hover,
  input[type="radio"] {
    cursor: pointer;
  }

  img {
    height: 100%;
  }

  .checkoptions {
    display: flex;
    flex-wrap: wrap;
  }

  .check {
    width: 50%;
    font-size: 1rem;
  }

  .answer {
    background: #429e52;
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 0.5rem;
    color: #fff;
  }
</style>
