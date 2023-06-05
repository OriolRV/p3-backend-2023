import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//Clear database, just for developing purposes.
await prisma.gene.deleteMany({});
await prisma.patient.deleteMany({});
await prisma.phenotype.deleteMany({});
await prisma.disease.deleteMany({});

//Create many genes
const gene1 = await prisma.gene.create({ data: { name: "geneA" } });
const gene2 = await prisma.gene.create({ data: { name: "geneB" } });
const gene3 = await prisma.gene.create({ data: { name: "geneC" } });
const gene4 = await prisma.gene.create({ data: { name: "geneD" } });
const gene5 = await prisma.gene.create({ data: { name: "geneE" } });

//Create many patients
const patient1 = await prisma.patient.create({
	data: { fullName: "Nils", country: "France", firstCaseFamily: true },
});
const patient2 = await prisma.patient.create({
	data: { fullName: "Magí", country: "Spain", firstCaseFamily: false },
});
const patient3 = await prisma.patient.create({
	data: { fullName: "Adrià", country: "Spain", firstCaseFamily: false },
});
const patient4 = await prisma.patient.create({
	data: { fullName: "Àlex", country: "Greece", firstCaseFamily: true },
});
const patient5 = await prisma.patient.create({
	data: { fullName: "Pol", country: "Ireland", firstCaseFamily: true },
});

//Create many phenotypes
const phenotype1 = await prisma.phenotype.create({
	data: { name: "badHeart" },
});
const phenotype2 = await prisma.phenotype.create({ data: { name: "badLung" } });
const phenotype3 = await prisma.phenotype.create({
	data: { name: "badBrain" },
});
const phenotype4 = await prisma.phenotype.create({
	data: { name: "badKidney" },
});
const phenotype5 = await prisma.phenotype.create({
	data: { name: "badStomach" },
});

//Create many diseases
const disease1 = await prisma.disease.create({
	data: {
		name: "Disease1",
		affectedPatient: { connect: [{ id: patient1.id }] },
		associatedPhenotype: {
			connect: [{ id: phenotype1.id }, { id: phenotype2.id }],
		},
		causingGenes: { connect: [{ id: gene1.id }] },
	},
});
const disease2 = await prisma.disease.create({
	data: {
		name: "Disease2",
		affectedPatient: { connect: [{ id: patient1.id }] },
		associatedPhenotype: { connect: [{ id: phenotype3.id }] },
		causingGenes: { connect: [{ id: gene2.id }, { id: gene3.id }] },
	},
});
const disease3 = await prisma.disease.create({
	data: {
		name: "Disease3",
		affectedPatient: { connect: [{ id: patient2.id }, { id: patient3.id }] },
		associatedPhenotype: { connect: [{ id: phenotype4.id }] },
		causingGenes: { connect: [{ id: gene4.id }] },
	},
});
const disease4 = await prisma.disease.create({
	data: {
		name: "Disease4",
		affectedPatient: { connect: [{ id: patient4.id }] },
		associatedPhenotype: {
			connect: [{ id: phenotype1.id }, { id: phenotype5.id }],
		},
		causingGenes: { connect: [{ id: gene4.id }, { id: gene5.id }] },
	},
});
const disease5 = await prisma.disease.create({
	data: {
		name: "Disease5",
		affectedPatient: { connect: [{ id: patient5.id }] },
		associatedPhenotype: { connect: [{ id: phenotype5.id }] },
		causingGenes: { connect: [{ id: gene5.id }] },
	},
});
