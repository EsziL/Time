class Switch extends HTMLElement {
	constructor() {
		super();
		this.state = false;
		this.height = this.getAttribute("height") || "50px";
		this.width = this.getAttribute("width") || "120px";
		this.offbgr = this.getAttribute("offbgr") || "black";
		this.onbgr = this.getAttribute("onbgr") || "white";
		this.offhandle = this.getAttribute("offhandle") || "white";
		this.onhandle = this.getAttribute("onhandle") || "black";
		this.anim = this.getAttribute("anim") || true;
		this.animdur = this.getAttribute("animdur") || "0.25s";
		this.animtype = this.getAttribute("animtype") || "ease";
		this.zindex = this.getAttribute("z") || "1";
		this.default = this.getAttribute("default") || false;
		this.curve = this.getAttribute("curve") || "100000px";

		this.bgr = document.createElement("div");
		this.crcl = document.createElement("div");
		this.bgr.style.backgroundColor = this.offbgr;
		this.crcl.style.backgroundColor = this.offhandle;
		this.bgr.style.width = this.width;
		this.bgr.style.height = this.height;
		this.crcl.style.height = `calc(${this.height} * .7)`;
		this.crcl.style.width = `calc(${this.width} * .25)`;
		this.bgr.style.borderRadius = this.curve;
		this.crcl.style.borderRadius = this.curve;
		this.bgr.style.display = "flex";
		this.bgr.style.alignItems = "center";
		this.bgr.style.justifyContent = "center";
		this.crcl.style.position = "relative";
		this.style.zIndex = this.zindex;
		var uuid = this.getAttribute("class") || getUUID();
		uuid = uuid.split(" ")[0];
		this.classList.add(uuid);
		if (this.anim === true || this.anim === "true" || this.anim === "yes") {
			this.crcl.style.transition = `left ${this.animdur} ${this.animtype}, background-color ${this.animdur} ${this.animtype}`;
			this.bgr.style.transition = `background-color ${this.animdur} ${this.animtype}`;
		}
		if (this.default === true || this.default === "true" || this.default === "yes") {
			this.state = true;
		}

		this.appendChild(this.bgr);
		this.bgr.appendChild(this.crcl);

		this.update();

		this.addEventListener("click", (e) => {
			if(e.target.closest(`.${uuid}`)) {
				this.toggle();
			}
		});
	}

	disable() {
		this.state = false;
		this.update();
	}
	enable() {
		this.state = true;
		this.update();
	}
	toggle() {
		this.state = !this.state;
		this.update();
		
	}
	update() {
		if (this.state) {
			this.crcl.style.backgroundColor = this.onhandle;
			this.bgr.style.backgroundColor = this.onbgr;
			this.crcl.style.left = "30%";
		} else {
			this.crcl.style.backgroundColor = this.offhandle;
			this.bgr.style.backgroundColor = this.offbgr;
			this.crcl.style.left = "-30%";
		}
	}
}

customElements.define('e-switch', Switch);


function randomUUID() {
	let uuid = '';
	const chars = '0123456789abcdef';
	for (let i = 0; i < 16; i++) {
	  uuid += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return uuid;
  }
  function getUUID() {
	let uuid = randomUUID();
	while (document.querySelector('.a' + uuid) !== null) {
	  uuid = randomUUID();
	}
	return "a" + uuid;
  }

